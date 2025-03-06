import { FormProps } from "../../../types/formProps";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { Link } from "../../link";
import { TextLabel } from "../../textLabel";

export default class LoginForm extends FormWrapper {

  constructor() {
    super(
      //props
      {
        className: 'dialog__form',
        formState: {
          login: '',
          password: '',
        },
        events: [
          {
            eventName: 'submit',
            eventFunc: (e : Event) => {
              e.preventDefault();
              const result = this.checkValidityBeforeSubmit();
              if (result) {
                console.log((this.getProperties() as FormProps).formState!);
              }
              else {
                console.log('error');
              }
            }
          }
        ],
      },
      //childrens
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),

        loginLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Логин", inputId: "login" }),
        inputLogin : new InputText({
          className: "inputText",
          attributes: [
            { name: "name", value: "login"},
            { name: "type", value: "text" },
            { name: "id", value: "login" },
          ],
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkLoginInput();
              }
            }
          ],
        }),
        errorLabelLogin: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        passLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Пароль", inputId: "password" }),
        inputPass : new InputText({
          className: "inputText",
          attributes: [
            { name: "name", value: "password" },
            { name: "type", value: "password" },
            { name: "id", value: "password" }
          ],
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkPasswordInput();
              }
            }
          ],
        }),
        errorLabelPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        buttonSignIn : new Button ({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Авторизоваться',
        }),

        linkRegistration: new Link({
          className: "link",
          linkText: "Нет аккаунта?",
        }),
      }
    );
  }

  override render(): string {
    return `
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
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    let result = true;
    result = result && this.checkLoginInput();
    result = result && this.checkPasswordInput();
    return result;
  }

}
