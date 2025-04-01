import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export default class Store extends EventBus {

  private state = {};

  private static __instance : Store;

  constructor(defaultState : object) {

    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState : object) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
