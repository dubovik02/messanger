# Мессенджер ЯП. Обмен мгновенными сообщениями и не только.

Версия 0.0.1
Реализованы базовые представления клиентской части для настольных ПК.

  - Страница Login
  - Страница Signin
  - Выбор Чата
  - Настройки пользователя
  - Изменение данных пользователя
  - Изменение пароля пользователя
  - Страница 404
  - Страница 500

Применен компонентный подход.
Добавлена валидация форм, отправка объектов форм в консоль.
Настроены ESLint, StyleLint.

Добавлены переходы по страницам через нажатие на кнопки в интерфейсе приложения. 
Внедрен HTTP API чатов.
Подключен WebSocket для работы с real-time сообщениями.

Технологический стек:
- TypeScript
- CSS
- HTML, шаблонизатор Handlebars

Макет дизайна:
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1

Сборщик: 
- Vite

Запуск проекта
- `npm run dev` — запуск версии для разработчика

Сборка проекта
- `npm start` — сборка проекта

#### Версия сервиса доступна по адресу:
https://yp-messanger.netlify.app

#### Текущая версия кода:
https://github.com/dubovik02/messanger
