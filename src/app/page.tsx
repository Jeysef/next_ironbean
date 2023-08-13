"use client";
import { useBean } from "ironbean-react";
import { PageStore } from "./pageStore";

export default function Home() {
  const store = useBean(PageStore);
  return <div>storeTitle: {store.title}</div>;
}
