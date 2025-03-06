import { FormProps } from "../../../types/formProps";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { Link } from "../../link";
import { TextLabel } from "../../textLabel";

export default class SigninForm extends FormWrapper {

  constructor() {
    super(
      //props
      {
        className: 'dialog__form',
        formState: {
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
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

        emailLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Почта", inputId: "email" }),
        inputEmail : new InputText({
          className: "inputText",
          attributes: [
            {
              name: "name",
              value: "email"
            },
            {
              name: "id",
              value: "email"
            }
          ],
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkEmailInput();
              }
            }
          ],
        }),
        errorLabelEmail: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        loginLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Логин", inputId: "login" }),
        inputLogin : new InputText({
          className: "inputText",
          attributes: [
            { name: "type", value: "text" },
            { name: "name", value: "login"},
            { name: "id", value: "login" }
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
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkFirstNameInput();
              }
            }
          ],
        }),
        errorLabelFirstName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

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
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkSecondNameInput();
              }
            }
          ],
        }),
        errorLabelSecondName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

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
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkPhoneInput();
              }
            }
          ],
        }),
        errorLabelPhone: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

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
        errorLabelPassRepeat: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        buttonSignUp: new Button ({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Зарегистрироваться',
        }),

        linkSignIn: new Link({
          className: "link",
          linkText: "Войти",
        }),
      }
    );
  }

  override render(): string {
    return `
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
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    let result = true;
    result = result && this.checkLoginInput();
    result = result && this.checkPasswordInput();
    result = result && this.checkEmailInput();
    result = result && this.checkFirstNameInput();
    result = result && this.checkSecondNameInput();
    result = result && this.checkPhoneInput();
    return result;
  }
}
