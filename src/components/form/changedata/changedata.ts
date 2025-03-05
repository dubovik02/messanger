import Block from "../../../core/block";
import { FormProps } from "../../../types/formProps";
import { User } from "../../../types/user";
import { Button } from "../../button";
import { DataInput } from "../../dataInput";
import { FormWrapper } from "../../form-wrapper";
import inputText from "../../inputText/inputText";
import { TextLabel } from "../../textLabel";

export default class ChangeDataForm extends FormWrapper {

  constructor(user : User) {
    super(
      //main
      {
        className: 'dialog__form',
        formState: {
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          display_name: '',
          phone: '',
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
                { name: "value", value: user.email ? user.email : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkEmailInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelEmail: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

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
                { name: "value", value: user.login ? user.login : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkLoginInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelLogin: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

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
                { name: "value", value: user.first_name ? user.first_name : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkFirstNameInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelFirstName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

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
                { name: "value", value: user.second_name ? user.second_name : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkSecondNameInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelSecondName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

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
                { name: "value", value: user.display_name ? user.display_name : ''}
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
                { name: "value", value: user.phone ? user.phone : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkPhoneInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelPhone: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

        buttonSave :  new Button({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Сохранить',
        }),
      }
    );
  }

  override render(): string {
    return `
      {{{ inputEmail }}}
      {{{ errorLabelEmail }}}

      {{{ inputLogin }}}
      {{{ errorLabelLogin }}}

      {{{ inputFirstName }}}
      {{{ errorLabelFirstName }}}

      {{{ inputSecondName }}}
      {{{ errorLabelSecondName }}}

      {{{ inputDisplayName }}}

      {{{ inputPhone }}}
      {{{ errorLabelPhone }}}

       <div class="user__button-container user__button-container_center">
        {{{ buttonSave }}}
      </div>
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    let result = true;

    const elemLogin = ((this.getChildrens()['inputLogin'] as Block).getChildrens()['input'] as Block).element;
    const elemEmail = ((this.getChildrens()['inputEmail'] as Block).getChildrens()['input'] as Block).element;
    const elemFirstName = ((this.getChildrens()['inputFirstName'] as Block).getChildrens()['input'] as Block).element;
    const elemSecondName = ((this.getChildrens()['inputSecondName'] as Block).getChildrens()['input'] as Block).element;
    const elemPhone = ((this.getChildrens()['inputPhone'] as Block).getChildrens()['input'] as Block).element;

    result = result && this.checkLoginInput(elemLogin);
    result = result && this.checkEmailInput(elemEmail);
    result = result && this.checkFirstNameInput(elemFirstName);
    result = result && this.checkSecondNameInput(elemSecondName);
    result = result && this.checkPhoneInput(elemPhone);
    return result;
  }
}
