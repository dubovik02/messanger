export default class EventBus {

  private _listeners : Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  on(event : string, callback : Function) {

    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event as keyof object].push(callback);
  }

  off(event : string, callback : Function) {

		if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      listener => listener !== callback
    );
  }

  //тип аргумента может быть любой
	emit(event : string, ...args : any) {

    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}
