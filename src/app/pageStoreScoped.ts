import { component, scope } from "ironbean";
import { makeAutoObservable, makeObservable, observable } from "mobx";
import { pageScope } from "./layout";

@component
@scope(pageScope)
export class PageStore {
  private _title = "Ironbean in page scope";

  constructor() {
    makeAutoObservable(this);
  }

  set title(value: string) {
    this._title = value;
    console.log("PageStore.title.set", this._title);
  }

  get title(): string {
    console.log("PageStore.title.get", this._title);
    return this._title;
  }
}
