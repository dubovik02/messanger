import Block from "../../../core/block";
import UserService from "../../../services/user";
import { FormProps } from "../../../types/formProps";
import { connect } from "../../../utils/connect";
import { Button } from "../../button";
import { DataInput } from "../../dataInput";
import { FormWrapper } from "../../form-wrapper";
import inputText from "../../inputText/inputText";
import { PictureButton } from "../../pictureButton";
import { TextLabel } from "../../textLabel";
import { Waiter } from "../../waiter";
import apiPath from "../../../constants/api";

type PasswordFormProps = FormProps & {
  currentUser : Record<string, string>;
  emptyAvatar : string;
}

class ChangePasswordForm extends FormWrapper {

  constructor(props: PasswordFormProps) {
    super (
      {
        ...props,
        events: [
          {
            eventName: 'submit',
            eventFunc: (e : Event) => {
              e.preventDefault();
              const result = this.checkValidityBeforeSubmit();
              if (result) {
                const service = new UserService();
                service.changeUserPassword((this.getProperties() as FormProps).formState!);
              }
            }
          }
        ],
      },
      {

        avatar: new PictureButton({
          className: 'pictureButton pictureButton_cursor-default',
          pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          imagePath: props.blockData!.avatar ? (apiPath.RESOURCES + props.blockData!.avatar) : props.emptyAvatar,
        }),

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
          forName: "passwordRepeat",
          labelText: "Повторите новый пароль",
          },
          {
            input: new inputText({
              className: "dataInput__input",
              attributes: [
                { name: "name", value: "passwordRepeat" },
                { name: "id", value: "passwordRepeat" },
                { name: "placeholder", value: "Введите новый пароль еще раз"},
                { name: "type", value: "password"},
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkRepeatedNewPasswordInput(e.target as HTMLInputElement,
                      (this.getProperties() as FormProps).formState!.newPassword
                    );
                  }
                }
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

        spinner: new Waiter()
      }
    );
  }

  override render(): string {

    const avatarElem = this.getChildrens()['avatar'] as Block;
    const path = (this.getProperties() as PasswordFormProps).currentUser.avatar;
    const fullPath = path ? (apiPath.RESOURCES + path) : (this.getProperties() as PasswordFormProps).emptyAvatar;
    avatarElem.setProps({imagePath: fullPath});

    return `

      {{#if isLoading}}
        {{{ spinner }}}
      {{/if}}

      <div class="user__avatar-container">
        {{{ avatar }}}
        {{> TextLabelHBS classStyle="textLabel textLabel_subtitle" labelText=blockData.display_name}}
      </div>

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
    const elemRepeatPass = ((this.getChildrens()['inputRepeatPass'] as Block).getChildrens()['input'] as Block).element;
    const val = (this.getProperties() as FormProps).formState!.newPassword;

    result = result && this.checkOldPasswordInput(elemOldPass);
    result = result && this.checkNewPasswordInput(elemNewPass);
    result = result && this.checkRepeatedNewPasswordInput(elemRepeatPass, val);

    return result;
  }

}

const mapStateToProps = (state : Record<string, unknown>) => {
  return {
    isLoading: state.isLoading,
    currentUser: state.currentUser,
    blockData: state.currentUser,
    emptyAvatar: state.emptyAvatar
  };
};

export default connect(mapStateToProps)(ChangePasswordForm);
