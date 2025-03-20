import './style.css';

import avatar from './assets/hafizov.jpg';
import emptyAvatar from "./assets/emptyAvatar.png";
import * as Components  from './components';
import * as Pages from './pages';
import Block from './core/block';
import { User } from './types/user';
import Router from './routing/router';
import Pathnames from './constants/pathnames';
import Store, { StoreEvents } from './core/store';
import Handlebars from 'handlebars';

// тестовые данные - начало
const chats : Block[] = [
  new Components.ChatCard(
    {
      selected: false,
      chatName: 'Николай',
      owner: 'Вы',
      lastChat: 'Изображение',
      imagePath: avatar,
      time: '12:32',
      count: 1
    }
  ),
  new Components.ChatCard(
    {
      selected: true,
      chatName: 'D. Tramp',
      lastChat: 'Hey, I am here!',
      imagePath: avatar,
      time: '06:32',
      count: 10
    }
  ),
];

const chatsSet : Components.ChatSet[] = [
  new Components.ChatSet(
    {
      message: 'Трамп рассказал о желании заключить сделку с украинским президентом Владимиром Зеленским на $500 млн относительно доступа к редкоземельным минералам и газу на Украине в обмен на гарантии безопасности в любом потенциальном мирном урегулировани',
      messageDirectionClass: 'chatSet__message-container_from-me',
      messageStatus: 'v',
      messageTime: '04:56',
    }
  ),

  new Components.ChatSet(
    {
      message: 'Иногда слова не нужны. Используйте стикеры и GIF-анимацию, делитесь повседневными впечатлениями с помощью функции "Статус". Записывайте голосовые сообщения, чтобы поделиться новостями или просто сказать "Привет!".',
      messageDirectionClass: 'chatSet__message-container_for-me',
      messageStatus: 'v',
      messageTime: '15:57',
    }
  ),
];

const user : User = {
  email: 'adv@mail.ru',
  login: 'Don',
  first_name: 'Ivan',
  second_name: 'Soloviev',
  display_name: 'Ivanushka',
  phone: '+78622153421',
  avatarPath: avatar,
}
// тестовые данные - конец

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

const defaultState = {
  currentUser: null,
  isLoading: false,
  signupError: null,
  loginError: null,
  userChats: chats,
  chatsSet: [],
  emptyAvatar: emptyAvatar
}

window.router = new Router('.main-container', notFoundRoute);
window.store = new Store(defaultState);

window.store.on(StoreEvents.Updated, (prevState : object, newState : object) => {
  // console.log("prevState", prevState);
  // console.log("newState", newState);
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

//Anton, Qwerty12345
