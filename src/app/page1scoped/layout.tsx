"use client";
import { ApplicationContext } from "ironbean";
// import { ContextProvider, useBean } from "ironbean-react";
import { useBean } from "ironbean-react";
import { ContextProvider } from "../contextHistory";
import { pageScope } from "../layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    const context =
        useBean(ApplicationContext).createOrGetParentContext(pageScope);
    console.log("🚀 ~ file: layout.tsx:10 ~ Layout ~ context:", context)
    // return <ContextProvider context={context}>{children}</ContextProvider>;
    return <ContextProvider context={context}>{children}</ContextProvider>
}
