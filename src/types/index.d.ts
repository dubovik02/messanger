import Store from "../core/store";
import Router from "../routing/router";

export { };

declare global {
  interface Window {
    store: Store;
    router: Router;
  }
}
