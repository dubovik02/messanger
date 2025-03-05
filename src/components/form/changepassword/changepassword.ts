import Block from "../../../core/block";
import { FormProps } from "../../../types/formProps";
import { Button } from "../../button";
import { DataInput } from "../../dataInput";
import { FormWrapper } from "../../form-wrapper";
import inputText from "../../inputText/inputText";
import { TextLabel } from "../../textLabel";

export default class ChangePasswordForm extends FormWrapper {

  constructor() {
    super (
      {
        className: 'dialog__form',
        formState: {
          oldPassword: '',
          newPassword: '',
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
      {
        inputOldPass: new DataInput({
          className: 'dataInput',
          forName: "oldPassword",
          labelText: "Старый пароль",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "oldPassword" },
                { name: "id", value: "oldPassword" },
                { name: "placeholder", value: "Введите старый пароль"},
                { name: "type", value: "password"},
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkOldPasswordInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelOldPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

        inputNewPass: new DataInput({
          className: 'dataInput',
          forName: "newPassword",
          labelText: "Новый пароль",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "newPassword" },
                { name: "id", value: "newPassword" },
                { name: "placeholder", value: "Введите новый пароль"},
                { name: "type", value: "password"},
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkNewPasswordInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }
          ),
        }),
        errorLabelNewPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

        inputRepeatPass: new DataInput({
          className: 'dataInput',
          forName: "repPassword",
          labelText: "Повторите новый пароль",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "repPassword" },
                { name: "id", value: "repPassword" },
                { name: "placeholder", value: "Введите новый пароль еще раз"},
                { name: "type", value: "password"},
              ],
            }
          ),
        }),
        errorLabelRepeatPass: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

        buttonSave :  new Button ({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Сохранить',
        }),
      }
    );
  }

  override render(): string {
    return `
      {{{ inputOldPass }}}
      {{{ errorLabelOldPass }}}

      {{{ inputNewPass }}}
      {{{ errorLabelNewPass }}}

      {{{ inputRepeatPass }}}
      {{{ errorLabelRepeatPass }}}

      <div class="user__button-container user__button-container_center">
        {{{ buttonSave }}}
      </div>
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    let result = true;

    const elemOldPass = ((this.getChildrens()['inputOldPass'] as Block).getChildrens()['input'] as Block).element;
    const elemNewPass = ((this.getChildrens()['inputNewPass'] as Block).getChildrens()['input'] as Block).element;

    result = result && this.checkOldPasswordInput(elemOldPass);
    result = result && this.checkOldPasswordInput(elemNewPass);

    return result;
  }

}
