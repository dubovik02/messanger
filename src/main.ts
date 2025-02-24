import './style.css';

import avatar from './assets/hafizov.jpg';
// import dots from './assets/dots.png';
// import arrRight from './assets/arrowR.png';
// import arrLeft from './assets/arrowL.png';
// import clip from './assets/clip.png';


import IPage from './Interfaces/IPage';

import Handlebars from 'handlebars';
import * as Components  from './components';
import * as Pages from './pages';
import Block from './core/block';
import { renderDOM } from './core/renderDOM';
import { addToElement } from './core/renderDOM';

const header = document.querySelector('.header');

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

]

const pages :  Array<IPage> = [
  {description: 'Страница Login', mnemoCode: 'LoginPage', component: new Pages.LoginPage()},
  {description: 'Страница Signin', mnemoCode: 'SigninPage', component: new Pages.SigninPage()},
  {description: 'Выбор Чата', mnemoCode: 'SelectChatPage', component: new Pages.SelectChatPage(chats, chatsSet)},
  // {description: 'Настройки пользователя', mnemoCode: 'UserPage'},
  // {description: 'Изменение данных пользователя', mnemoCode: 'ChangeDataPage'},
  // {description: 'Изменение пароля пользователя', mnemoCode: 'ChangePasswordPage'},
  // {description: 'Страница 404', mnemoCode: 'NotFoundPage'},
  // {description: 'Страница 500', mnemoCode: 'ServerErrorPage'},
];

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

Object.entries(Pages).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function onLoadDOM() {
  createNavigationPanel();
}

function makePageAsComponent(pageBlock : Block) {
  renderDOM('.main-container', pageBlock);
}

function createNavigationPanel() {
  if (header) {
    pages.forEach((item) => {
      const link = new Components.Link({
        className: "link",
        linkText: item.description,
        events: [
          {eventName: 'click', eventFunc: (e : Event) => {
            makePageAsComponent(item.component as Block);
            e.preventDefault();
          }}
        ]
      });
      addToElement('.header', 'beforeend', link);
    })
  }
}

document.addEventListener('DOMContentLoaded', onLoadDOM);
