"use client";
import { useBean } from "ironbean-react";
import { PageStore } from "../pageStore";
import { observer } from "mobx-react";

export default observer(() => {
  const store = useBean(PageStore);
  return (
    <div>
      <div>storeTitle: {store.title}</div>
      <button onClick={() => (store.title = "new title")}>set title</button>
      <button onClick={() => store.title}>getTitle</button>
    </div>
  );
})
