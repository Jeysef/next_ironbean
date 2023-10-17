"use client";
import { ApplicationContext, component } from "ironbean";
import { ContextProvider as ApplicationContextProvider, useBean } from "ironbean-react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";
import { FC, useContext, useEffect, useState } from "react";

export enum HistoryAction {
    PUSH = "PUSH",
    POP = "POP",
    REPLACE = "REPLACE",
}
export interface IContextProvider {
    children: React.ReactNode;
    context: ApplicationContext;
}


export const ContextProvider: FC<IContextProvider> = (props) => {
    const { children } = props;
    const history = useHistory();
    const store = useBean(Storage);
    console.log("props.context", props.context)

    const [context, setContext] = useState<ApplicationContext>(props.context);

    useEffect(() => {
        setContext(prevContext => store.figure(history, prevContext));
    }, [history, store]);

    return <ApplicationContextProvider context={context}>{children}</ApplicationContextProvider>;
};

export interface HistoryContextBaseProps {
    url: string;
    historyLength: number;
    action?: HistoryAction;
}

function useHistory() {
    const routerContext = useContext(LayoutRouterContext);
    // console.log("history", history)
    const initialState: HistoryContextBaseProps = {
        url: routerContext.url,
        // history.length doesn't have to start at 0 nor 1
        historyLength: history.length,
        action: undefined,
    };

    const [historyContext, setHistoryContext] = useState<HistoryContextBaseProps>(initialState);

    useEffect(() => {
        const getNewHistoryProps = (previousHistoryProps: HistoryContextBaseProps): HistoryContextBaseProps => {
            const historyChanged = previousHistoryProps.url !== routerContext.url;
            const action = history.length > previousHistoryProps.historyLength ? HistoryAction.PUSH : historyChanged ? HistoryAction.POP : HistoryAction.REPLACE;
            const newHistoryProps: HistoryContextBaseProps = {
                url: routerContext.url,
                historyLength: history.length,
                action,
            };
            return newHistoryProps;
        };
        setHistoryContext((previousHistoryProps) => getNewHistoryProps(previousHistoryProps));
    }, [routerContext.url]);

    return historyContext;
}

interface IStorage {
    get: (historyContext: HistoryContextBaseProps) => ApplicationContext | null;
    set: (historyContext: HistoryContextBaseProps, context: ApplicationContext) => void;
    append: (historyContext: HistoryContextBaseProps, context: ApplicationContext) => ApplicationContext;
    figure: (historyContext: HistoryContextBaseProps, context: ApplicationContext) => ApplicationContext;
}

/**
 * Storage class for storing ApplicationContexts, setting them, getting them and appending them.
 */
@component
class Storage implements IStorage {
    private contexts: Map<string, ApplicationContext> = new Map();
    private applicationContext: ApplicationContext;
    private historyContexts: Map<string, HistoryContextBaseProps> = new Map();

    constructor(applicationContext: ApplicationContext) {
        this.applicationContext = applicationContext;
    }

    /**
     * Appends current ApplicationContext to the contexts Map.
     * @param historyContext 
     * @returns ApplicationContext
     */
    append(historyContext: HistoryContextBaseProps, context: ApplicationContext): ApplicationContext {
        this.contexts.set(this.getKey(historyContext), context);
        return context;
    }

    /**
     * Gets an ApplicationContext from the contexts Map.
     * @param historyContext 
     * @returns ApplicationContext
     */
    get(historyContext: HistoryContextBaseProps): ApplicationContext | null {
        return this.contexts.get(this.getKey(historyContext)) ?? null;
    }

    /**
     * Sets an ApplicationContext in the contexts Map.
     * @param historyContext 
     * @param context 
     */
    set(historyContext: HistoryContextBaseProps, context: ApplicationContext) {
        this.contexts.set(this.getKey(historyContext), context);
    }

    /**
     * Figures out which ApplicationContext to use based on the historyContext.
     * @param historyContext
     * @param context
     * @returns ApplicationContext
     */
    figure(historyContext: HistoryContextBaseProps, context: ApplicationContext): ApplicationContext {
        if (historyContext.action === HistoryAction.PUSH) {
            console.log("Setting context")
            return this.append(historyContext, context);
        }
        else if (historyContext.action === HistoryAction.POP) {
            console.log("Getting context")
            return this.get(historyContext) ?? context;
        }
        return context;
    }

    getKey = (historyContext: HistoryContextBaseProps): string => {
        return `${historyContext.url}-${historyContext.historyLength}-${historyContext.action}`
    }

}