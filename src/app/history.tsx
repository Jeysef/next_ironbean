// "use client";
// import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";
// import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
// import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

// export enum HistoryAction {
//     PUSH = "PUSH",
//     POP = "POP",
//     REPLACE = "REPLACE",
// }

// export interface HistoryContextProps {
//     url: string;
//     historyLength: number;
//     action?: HistoryAction;
// }

// export const WithHistory: FC<PropsWithChildren> = ({ children }) => {
//     const routerContext = useContext(LayoutRouterContext);
//     const [historyProps, setHistoryProps] = useState<HistoryContextProps>({
//         url: routerContext.url,
//         // history.length doesn't have to start at 0 nor 1
//         historyLength: history.length,
//         action: undefined,
//     });

//     const HistoryContext = createContext<HistoryContextProps>(historyProps);
//     const { Provider } = HistoryContext;

//     useEffect(() => {
//         const historyChanged = historyProps.url !== routerContext.url;
//         const action = history.length > historyProps.historyLength ? HistoryAction.PUSH : historyChanged ? HistoryAction.POP : undefined;
//         const newHistoryProps: HistoryContextProps = {
//             url: routerContext.url,
//             historyLength: history.length,
//             action,
//         };
//         console.log("newHistoryProps", newHistoryProps);
//         setHistoryProps(newHistoryProps);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [routerContext.url]);
//     console.log("historyProps", historyProps);

//     return <Provider value={historyProps}>{children}</Provider>;
// };
