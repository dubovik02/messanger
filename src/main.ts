import './style.css';

import emptyAvatar from "./assets/emptyAvatar.png";
import * as Components  from './components';
import * as Pages from './pages';
import Router from './routing/router';
import Pathnames from './constants/pathnames';
import Store, { StoreEvents } from './core/store';
import Handlebars from 'handlebars';

// тестовые данные - начало
const chats =  [
  {
    "id": 123,
    "title": "my-chat",
    "avatar": "/123/avatar1.jpg",
    "unread_count": 15,
    "created_by": 12345,
    "last_message": {
      "user": {
        "first_name": "Petya",
        "second_name": "Pupkin",
        "avatar": "/path/to/avatar.jpg",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2020-01-02T14:22:22.000Z",
      "content": "this is message content"
    }
  }
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
    activeChatId: -1,
    activeChatUser: [],
    emptyAvatar: emptyAvatar,
    isDialogShow: false,
    isContextMenuShow: false,
  }
}
// const defaultState = {
//   currentUser: {},
//   isLoading: false,
//   signupError: null,
//   loginError: null,
//   userChats: [],
//   emptyAvatar: emptyAvatar,
//   isDialogShow: false,
//   isContextMenuShow: false,
// }

window.router = new Router('.main-container', notFoundRoute);
window.store = new Store(defaultState);

window.store.on(StoreEvents.Updated, (prevState : object, newState : object) => {
  // console.log("prevState", prevState);
  // console.log("newState", newState);
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

//Anton, Qwerty12345


// Вопрос по HOC connect. - борьба с типами TS
// `function connect(mapStateToProps : Function) {
//   return function (Component type of Block)
//     return class extends Component { ........`

// Оборачиваю класс компонента
// `class ChangePasswordForm extends FormWrapper {// FormWrapper extends Block
//   constructor(props: PasswordFormProps) {
//     super (
//       { .............`

// Компилятор ругается - Argument of type 'typeof ChangePasswordForm' is not assignable to parameter of type 'typeof Block'.
// Types of construct signatures are incompatible.. Сигнатуры не совместимы. При этом все работает. Какой должен быть класс у Component - пока сломался...
