import { FormProps } from "../../../types/formProps";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { Link } from "../../link";
import { TextLabel } from "../../textLabel";
import Pathnames from "../../../constants/pathnames";
import AuthService from "../../../services/auth";
import { connect } from "../../../utils/connect";
import { Waiter } from "../../waiter";
import Block from "../../../core/block";

export class SigninForm extends FormWrapper {

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
                const authService = new AuthService();
                authService.signup((this.getProperties() as FormProps).formState!);
              }
            }
          }
        ],
      },
      //childrens
      {
        //title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Регистрация" }),

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
            {
              name: "name",
              value: "passwordRepeat"
            },
            {
              name: "id",
              value: "passwordRepeat"
            }
          ],
          events: [
            {
              eventName: 'blur',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.checkRepeatedPasswordInput(e.target as HTMLInputElement, (this.getProperties() as FormProps).formState!.password);
              }
            }
          ],
        }),
        errorLabelPassRepeat: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        errorLabelSignup: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        buttonSignUp: new Button ({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Зарегистрироваться',
        }),

        linkSignIn: new Link({
          className: "link",
          linkText: "Войти",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                document.location.pathname = Pathnames.LOGIN;
              }
            }
          ],
        }),

        spinner: new Waiter()
      }
    );
  }

  override render(): string {
    return `
      <div class="dialog__form-container">
        {{#if isLoading}}
          {{{ spinner }}}
        {{/if}}
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

        {{#if signupError}}
          {{> TextLabelHBS classStyle="textLabel textLabel_text textLabel_text-red textLabel_center" labelText=signupError}}
        {{/if}}

        {{{ buttonSignUp }}}
        {{{ linkSignIn }}}
      </div>
    `;
  }

  override checkValidityBeforeSubmit(): boolean {

    const elemRepeatPass = ((this.getChildrens()['inputPassRepeat'] as Block).getChildrens()['input'] as Block).element;
    const val = (this.getProperties() as FormProps).formState!.newPassword;

    let result = true;
    result = result && this.checkLoginInput();
    result = result && this.checkPasswordInput();
    result = result && this.checkRepeatedPasswordInput(elemRepeatPass, val);
    result = result && this.checkEmailInput();
    result = result && this.checkFirstNameInput();
    result = result && this.checkSecondNameInput();
    result = result && this.checkPhoneInput();
    return result;
  }
}


const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    signupError: state.signupError,
  };
};

export default connect(mapStateToProps)(SigninForm);
