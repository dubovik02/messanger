import Block from "../../core/block";
import { Button } from "../../components/button";
import { BlockProps } from "../../types/blockProps";
import { InputText, TextLabel } from "../../components";
import Link from "../../components/link/link";

export default class LoginPage extends Block {

  buttonSignIn = new Button ({className: "button", type: "button", buttonText: 'Авторизоваться' });

  props : BlockProps = {
    className : 'dialog dialog_small',
  }

  constructor() {
    super(
      //props
      'div',
      {
        className : 'dialog dialog_small',
      },
      //childrens
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),

        loginLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Логин", inputId: "login" }),
        inputLogin : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "name",
              value: "login"
            },
            {
              name: "type",
              value: "text"
            },
            {
              name: "id",
              value: "login"
            },
          ],
        }),
        errorLabelLogin: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "Ошибка" }),

        passLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Пароль", inputId: "password" }),
        inputPass : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "name",
              value: "password"
            },
            {
              name: "type",
              value: "password"
            },
            {
              name: "id",
              value: "password"
            }
          ],
        }),
        errorLabelPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        buttonSignIn : new Button ({
          className: "button",
          attributes: [{name: "type", value: "button"}],
          buttonText: 'Авторизоваться',
          events: [{eventName: 'click', eventFunc: () => {alert('qwe')}}]
        }),

        linkRegistration: new Link({
          className: "link",
          linkText: "Нет аккаунта?",
        }),
      }
    );
  }

  override render(): string {
    return `<div class="dialog__container">
              {{{ title }}}
              <form class="dialog__form">
                  <div class="dialog__form-container">
                      {{{ loginLabel }}}
                      {{{ inputLogin }}}
                      {{{ errorLabelLogin }}}

                      {{{ passLabel }}}
                      {{{ inputPass }}}
                      {{{ errorLabelPass }}}
                  </div>
                  <div class="dialog__form-container">
                    {{{ buttonSignIn }}}
                    {{{ linkRegistration }}}
                  </div>
              </form>
            </div>`
  }
}
