import { expect } from "chai";
import Router from "./router";
import Pathnames from "../constants/pathnames";

describe('Router', () => {

  const notFoundRouterProps = {
    pathname: Pathnames.NOT_FOUND,
    pageClass: 'Page',
    page: null
  };

  const testRouteProps = {
    pathname: Pathnames.USER,
    pageClass: 'Page',
    page: null,
  };

  function createRouter() {
    return Router('app', notFoundRouterProps);
  }

  it('Добавление маршрута в пул маршрутов роутера', () => {
    const router = createRouter();
    router.use(testRouteProps);
    expect(router.getRoute(Pathnames.USER)).to.not.eq(null);
  });

  it('Переход по истории назад', () => {
    const router = createRouter();
    window.history.pushState({page: 'messege'}, 'Messege', '');
    window.history.pushState({page: 'login'}, 'Login', '');
    router.back();
    expect(window.history.state['page']).to.eq('login');
  });

  it('Переход по истории вперед', () => {
    const router = createRouter();
    window.history.pushState({page: 'login'}, 'Login', '');
    window.history.pushState({page: 'messege'}, 'Messege', '');
    router.back();
    router.forward();
    expect(window.history.state['page']).to.eq('messege');
  });

});
