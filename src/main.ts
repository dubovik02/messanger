import './style.css';

import avatar from './assets/hafizov.jpg';
import dots from './assets/dots.png';
import arrRight from './assets/arrowR.png';
import arrLeft from './assets/arrowL.png';
import clip from './assets/clip.png';


import IPage from './Interfaces/IPage';

import Handlebars from 'handlebars';
import * as Components  from './components';
import * as Pages from './pages';

const container = document.querySelector('.main-container');
const header = document.querySelector('.header');

const pages :  Array<IPage> = [
  {description: 'Страница Login', mnemoCode: 'LoginPage'},
  {description: 'Страница Signin', mnemoCode: 'SigninPage'},
  {description: 'Выбор Чата', mnemoCode: 'SelectChatPage'},
  {description: 'Настройки пользователя', mnemoCode: 'UserPage'},
  {description: 'Изменение данных пользователя', mnemoCode: 'ChangeDataPage'},
  {description: 'Изменение пароля пользователя', mnemoCode: 'ChangePasswordPage'},
  {description: 'Страница 404', mnemoCode: 'NotFoundPage'},
  {description: 'Страница 500', mnemoCode: 'ServerErrorPage'},
];

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

Object.entries(Pages).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function onLoadDOM() {
  createNavigationPanel();
}

function makePage(pageName : string, params : object) {
  clearContentContainer();
  const temlpate = Handlebars.compile(pageName);
  const pageHTML = temlpate(params);
  if (container) {
    container.insertAdjacentHTML('beforeend', pageHTML);
  }
}

function clearContentContainer() {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

function createNavigationPanel() {
  if (header) {
    pages.forEach((item) => {
      const temlpate = Handlebars.compile(Components.Link);
      const butHTML = temlpate({linkText: item.description, name: item.mnemoCode });
      header.insertAdjacentHTML('beforeend', butHTML);
      const butEl = document.getElementsByName(`${item.mnemoCode}`);
      if (butEl) {
        butEl[0].addEventListener('click', (e) => {
          if (item.mnemoCode) {
            //@ts-ignore
            makePage(Pages[item.mnemoCode], 
              { imgSrc: avatar, picSrc: {dots: dots, right: arrRight, left: arrLeft, clip: clip } 
            });
          };
          e.preventDefault();
        });
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', onLoadDOM); 
