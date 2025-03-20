import { RouteProps } from "../types/routeProps";
import Route from "./route";

export default class Router {

  static __instance : Router;
  private routes! : Route[];
  private history! : History;
  private _currentRoute! : Route | null;
  private _rootQuery! : string;
  private _notFoundRoute! : Route;

  constructor(rootQuery : string, notFoundRouterProps : RouteProps) {

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._notFoundRoute = new Route(notFoundRouterProps);

    Router.__instance = this;
  }

  use(routeProps : RouteProps) {
    const route = new Route(routeProps)
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      //this._onRoute(event.currentTarget!.location.pathname).bind(this);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname : string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this._currentRoute = this._notFoundRoute;
      this._notFoundRoute.render(this._rootQuery);
    }
    else {
      if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render(this._rootQuery);
    }

  }

  go(pathname : string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname : string) {
    return this.routes.find(route => route.match(pathname));
  }
}
