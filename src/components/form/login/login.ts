import { connect } from "../../../utils/connect";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { Link } from "../../link";
import { TextLabel } from "../../textLabel";
import Pathnames from "./../../../constants/pathnames";
import { Waiter } from "../../waiter";
import AuthService from "../../../services/auth";
import { FormProps } from "../../../types/formProps";
import { SignInData } from "../../../types/sighinData";
import pathes from '../../../constants/pathnames';

class LoginForm extends FormWrapper {

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
                const authService = new AuthService();
                authService.signin((this.getProperties() as FormProps).formState! as SignInData);
              }
            }
          }
        ],
      },
      //childrens
      {
        //title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),

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
                this.checkLoginInputToSignIn();
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
                this.checkPasswordInputToSignIn();
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
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                window.router.go(Pathnames.SIGNUP);
              }
            }
          ],
        }),

        errorLoginLabel: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        spinner: new Waiter()
      }
    );
  }

  override render(): string {
    return `
      {{#if isLoading}}
        {{{ spinner }}}
      {{/if}}

      <div class="dialog__form-container">
        {{{ loginLabel }}}
        {{{ inputLogin }}}
        {{{ errorLabelLogin }}}

        {{{ passLabel }}}
        {{{ inputPass }}}
        {{{ errorLabelPass }}}
      </div>
      <div class="dialog__form-container">

        {{#if loginError}}
          {{> TextLabelHBS classStyle="textLabel textLabel_text textLabel_text-red textLabel_center" labelText=loginError}}
        {{/if}}

        {{{ buttonSignIn }}}
        {{{ linkRegistration }}}
      </div>
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    let result = true;
    result = result && this.checkLoginInputToSignIn();
    result = result && this.checkPasswordInputToSignIn();
    return result;
  }

}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(LoginForm);
