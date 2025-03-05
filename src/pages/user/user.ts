import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { DataInput, Link, PictureButton, TextLabel } from "../../components";
import { User } from "../../types/user";
import inputText from "../../components/inputText/inputText";

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

        inputEmail: new DataInput({
          className: 'dataInput',
          forName: "email",
          labelText: "Почта",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "email" },
                { name: "id", value: "email" },
                { name: "placeholder", value: "Введите e-mail"},
                { name: "value", value: user.email ? user.email : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
        }),

        inputLogin: new DataInput({
          className: 'dataInput',
          forName: "login",
          labelText: "Логин",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "login" },
                { name: "id", value: "login" },
                { name: "placeholder", value: "Введите логин"},
                { name: "value", value: user.login ? user.login : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
        }),

        inputFirstName: new DataInput({
          className: 'dataInput',
          forName: "first_name",
          labelText: "Имя",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "first_name" },
                { name: "id", value: "first_name" },
                { name: "placeholder", value: "Введите имя"},
                { name: "value", value: user.first_name ? user.first_name : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
        }),

        inputSecondName: new DataInput({
          className: 'dataInput',
          forName: "second_name",
          labelText: "Фамилия",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "second_name" },
                { name: "id", value: "second_name" },
                { name: "placeholder", value: "Введите фамилию"},
                { name: "value", value: user.second_name ? user.second_name : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
        }),

        inputDisplayName: new DataInput({
          className: 'dataInput',
          forName: "display_name",
          labelText: "Имя в чате",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "display_name" },
                { name: "id", value: "display_name" },
                { name: "placeholder", value: "Введите имя в чате"},
                { name: "value", value: user.display_name ? user.display_name : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
        }),

        inputPhone: new DataInput({
          className: 'dataInput',
          forName: "phone",
          labelText: "Телефон",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "phone" },
                { name: "id", value: "phone" },
                { name: "placeholder", value: "Введите телефон"},
                { name: "value", value: user.phone ? user.phone : ''},
                { name: "readonly", value: "readonly"}
              ],
            }
          ),
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
          {{{ inputEmail }}}
          {{{ inputLogin }}}
          {{{ inputFirstName }}}
          {{{ inputSecondName }}}
          {{{ inputDisplayName }}}
          {{{ inputPhone }}}

          <div class="user__button-container">
            {{{ linkChangeData }}}
            {{{ linkChangePass }}}
            {{{ linkExit }}}
          </div>
      </div>
    `;
  }
}
