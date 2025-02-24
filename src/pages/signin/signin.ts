import Block from "../../core/block";
import { TextLabel } from "../../components";
import { InputText } from "../../components";
import { Button } from "../../components"
import { Link } from "../../components"

export default class SigninPage extends Block {
  constructor() {
    super(
      'div',
      //main
      {
        className : 'dialog dialog_large',
      },
      //child
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),

        emailLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Почта", inputId: "email" }),
        inputEmail : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "email"
            },
            {
              name: "name",
              value: "email"
            },
            {
              name: "id",
              value: "email"
            }
          ],
        }),
        errorLabelEmail: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "Invalid email" }),

        loginLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Логин", inputId: "login" }),
        inputLogin : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "text"
            },
            {
              name: "name",
              value: "login"
            },
            {
              name: "id",
              value: "login"
            }
          ],
        }),
        errorLabelLogin: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "Invalid login" }),

        firstNameLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Имя", inputId: "first_name" }),
        inputFirstName : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "text"
            },
            {
              name: "name",
              value: "first_name"
            },
            {
              name: "id",
              value: "first_name"
            }
          ],
        }),
        errorLabelFirsrtName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "-" }),

        secondNameLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Фамилия", inputId: "second_name" }),
        inputSecondName : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "text"
            },
            {
              name: "name",
              value: "second_name"
            },
            {
              name: "id",
              value: "second_name"
            }
          ],
        }),
        errorLabelSecondName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "+" }),

        phoneLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Телефон", inputId: "phone" }),
        inputPhone : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "tel"
            },
            {
              name: "name",
              value: "phone"
            },
            {
              name: "id",
              value: "phone"
            }
          ],
        }),
        errorLabelPhone: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "+7(495)" }),

        passLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Пароль", inputId: "password" }),
        inputPass : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "name",
              value: "password"
            },
            {
              name: "id",
              value: "password"
            },
            {
              name: "type",
              value: "password"
            },
          ],
        }),
        errorLabelPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        passLabelRepeat : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Пароль еще раз"}),
        inputPassRepeat : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "type",
              value: "password"
            },
          ],
        }),
        errorLabelPassRepeat: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "rep" }),

        buttonSignUp: new Button ({
          className: "button",
          attributes: [{name: "type", value: "button"}],
          buttonText: 'Зарегистрироваться',
          events: [{eventName: 'click', eventFunc: () => {alert('qwe')}}]
        }),

        linkSignIn: new Link({
          className: "link",
          linkText: "Войти",
        }),
      },
    );
  }

  override render(): string {
    return `
          <div class="dialog__container">
            {{{ title }}}
            <form class="dialog__form">
                <div class="dialog__form-container">
                    {{{ emailLabel }}}
                    {{{ inputEmail }}}
                    {{{ errorLabelEmail }}}

                    {{{ loginLabel }}}
                    {{{ inputLogin }}}
                    {{{ errorLabelLogin }}}

                    {{{ firstNameLabel }}}
                    {{{ inputFirstName }}}
                    {{{ errorLabelFirstName }}}

                    {{{ secondNameLabel }}}
                    {{{ inputSecondName }}}
                    {{{ errorLabelSecondName }}}

                    {{{ phoneLabel }}}
                    {{{ inputPhone }}}
                    {{{ errorLabelPhone }}}

                    {{{ passLabel }}}
                    {{{ inputPass }}}
                    {{{ errorLabelPass }}}

                    {{{ passLabelRepeat }}}
                    {{{ inputPassRepeat }}}
                    {{{ errorLabelPassRepeat }}}
                </div>
                <div class="dialog__form-container">
                    {{{ buttonSignUp }}}
                    {{{ linkSignIn }}}
                </div>
            </form>
          </div>
    `;
  }
}
