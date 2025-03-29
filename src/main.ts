import './style.css';

import emptyAvatar from "./assets/emptyAvatar.png";
import * as Components  from './components';
import * as Pages from './pages';
import Router from './routing/router';
import Pathnames from './constants/pathnames';
import Store, { StoreEvents } from './core/store';
import Handlebars from 'handlebars';

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

const loginRoute = {
  pathname: Pathnames.LOGIN,
  pageClass: Pages.LoginPage,
  page: null,
};

const signUpRoute = {
  pathname: Pathnames.SIGNUP,
  pageClass: Pages.SigninPage,
  page: null,
}

const userRoute = {
  pathname: Pathnames.USER,
  pageClass: Pages.UserPage,
  page: null,
}

const changDataRoute = {
  pathname: Pathnames.CHANGEDATA,
  pageClass: Pages.ChangeDataPage,
  page: null,
}

const chatRoute = {
  pathname: Pathnames.CHAT,
  pageClass: Pages.SelectChatPage,
  page: null,
}

const passwordRoute = {
  pathname: Pathnames.PASSWORD,
  pageClass: Pages.ChangePasswordPage,
  page: null,
}

const notFoundRoute = {
  pathname: Pathnames.NOT_FOUND,
  pageClass: Pages.NotFoundPage,
  page: null,
}

const serverErrRoute = {
  pathname: Pathnames.SERVER_ERR,
  pageClass: Pages.ServerErrorPage,
  page: null
}

let defaultState = {};
const storeStr = sessionStorage.getItem('store');
if (storeStr) {
  defaultState = JSON.parse(storeStr);
}
else {
  defaultState = {
    currentUser: {},
    isLoading: false,
    signupError: null,
    loginError: null,
    userChats: [],
    activeChatId: null,
    activeChatUser: [],
    activeChatIncomeMsg: [],
    activeChatOutcomeMsg: [],
    emptyAvatar: emptyAvatar,
    isDialogShow: false,
    isContextMenuShow: false,
  }
}

window.router = new Router('.main-container', notFoundRoute);
window.store = new Store(defaultState);

window.store.on(StoreEvents.Updated, (prevState : object, newState : object) => {
  sessionStorage.setItem('store', JSON.stringify(window.store.getState()));
});

window.router
  .use(loginRoute)
  .use(signUpRoute)
  .use(userRoute)
  .use(changDataRoute)
  .use(chatRoute)
  .use(passwordRoute)
  .use(notFoundRoute)
  .use(serverErrRoute)
  .start();
