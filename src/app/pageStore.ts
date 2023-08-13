import { component, scope } from "ironbean";
import { makeAutoObservable } from "mobx";

@component
export class PageStore {
  private _title = "Ironbean in root scope";

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
