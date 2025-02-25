import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { DataInput, Link, PictureButton, TextLabel } from "../../components";
import { User } from "../../types/user";

export default class UserPage extends Block {

  constructor(user : User) {

    super(
      'div',
      //main
      {
        className: 'user',
      },
      //children
      {
        backButton: new ArrowButton({
          className: 'arrowButton',
          imagePath: arrowLeft,
        }),

        avatar: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          imagePath: user.avatarPath ? user.avatarPath : emptyAvatar,
        }),

        avatarLabel: new TextLabel({className: "textLabel textLabel_subtitle", labelText: user.first_name! }),

        emailInp: new DataInput({
          className: 'dataInput',
          type: "email",
          forName: "email",
          labelText: "Почта",
          placeholder: "Введите e-mail",
          value: user.email ? user.email : ''
        }),

        loginInp: new DataInput({
          className: 'dataInput',
          type: "text",
          forName: "login",
          labelText: "Логин",
          placeholder: "Введите логин",
          value: user.login ? user.login : ''
        }),

        firstNameInp: new DataInput({
          className: 'dataInput',
          type: "text",
          forName: "first_name",
          labelText: "Имя",
          placeholder: "Введите Ваше имя",
          value: user.first_name ? user.first_name : ''
        }),

        secondNameInp: new DataInput({
          className: 'dataInput',
          type: "text",
          forName: "second_name",
          labelText: "Фамилия",
          placeholder: "Введите Вашу фамилию",
          value: user.second_name ? user.second_name : ''
        }),

        displayNameInp: new DataInput({
          className: 'dataInput',
          type: "text",
          forName: "display_name",
          labelText: "Имя в чате",
          placeholder: "Введите имя в чате",
          value: user.display_name ? user.display_name : ''
        }),

        phoneInp: new DataInput({
          className: 'dataInput',
          type: "tel",
          forName: "phone",
          labelText: "Телефон",
          placeholder: "Введите телефон",
          value: user.phone ? user.phone : ''
        }),

        linkChangeData: new Link({
          className: "link link_uderlined",
          linkText: "Изменить данные",
        }),

        linkChangePass: new Link({
          className: "link link_uderlined",
          linkText: "Изменить пароль",
        }),

        linkExit: new Link({
          className: "link link_uderlined link_red",
          linkText: "Выйти",
        }),
      }
    );
  }

  override render(): string {

    return `
      <div class="user__back-container">
        {{{ backButton }}}
      </div>
      <div class="user__container">
          <div class="user__avatar-container">
            {{{ avatar }}}
            {{{ avatarLabel }}}
          </div>
          {{{ emailInp }}}
          {{{ loginInp }}}
          {{{ firstNameInp }}}
          {{{ secondNameInp }}}
          {{{ displayNameInp }}}
          {{{ phoneInp }}}
          <div class="user__button-container">
            {{{ linkChangeData }}}
            {{{ linkChangePass }}}
            {{{ linkExit }}}
          </div>
      </div>
    `;
  }
}
