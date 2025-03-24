import Block from "../../../core/block";
import UserService from "../../../services/user";
import { FormProps } from "../../../types/formProps";
import { connect } from "../../../utils/connect";
import { Button } from "../../button";
import { DataInput } from "../../dataInput";
import { ModalDialog } from "../../dialog";
import { FormWrapper } from "../../form-wrapper";
import inputText from "../../inputText/inputText";
import { PictureButton } from "../../pictureButton";
import { SelectFileDialog } from "../../selectfiledialog";
import { TextLabel } from "../../textLabel";
import { Waiter } from "../../waiter";
import apiPath from "../../../constants/api";

type ChangeDataFormProps = FormProps & {
  currentUser: Record<string, string>;
  emptyAvatar: string;
}

class ChangeDataForm extends FormWrapper {

  constructor(props: ChangeDataFormProps) {
    super(
      //main
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
                service.changeUserProfile((this.getProperties() as FormProps).formState!);
              }
            }
          }
        ],
      },
      //childrens
      {
        avatar: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          imagePath: props.currentUser.avatar ? (apiPath.RESOURCES + props.currentUser.avatar) : props.emptyAvatar,
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                (this.getChildrens()['dialog'] as Block).show();
              }
            }
          ],
        }),

        dialog: new SelectFileDialog({}),

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
                { name: "value", value: props.blockData!.email ? props.blockData!.email : '' }
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
                { name: "value", value: props.blockData!.login ? props.blockData!.login : ''}
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
                { name: "value", value: props.blockData!.first_name ? props.blockData!.first_name : ''}
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
                { name: "value", value: props.blockData!.second_name ? props.blockData!.second_name : ''}
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
                { name: "value", value: props.blockData!.display_name ? props.blockData!.display_name : ''}
              ],
              events: [
                {
                  eventName: 'blur',
                  eventFunc: (e : Event) => {
                    e.preventDefault();
                    this.checkDisplayNameInput(e.target as HTMLInputElement);
                  }
                }
              ],
            }

          ),
        }),
        errorLabelDisplayName: new TextLabel({className: "textLabel textLabel_text textLabel_text-red textLabel_bordered", labelText: "" }),

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
                { name: "value", value: props.blockData!.phone ? props.blockData!.phone : ''}
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

        spinner: new Waiter()
      }
    );
  }

  override render(): string {

    const props = (this.getProperties() as ChangeDataFormProps);
    //const {avatar, inputEmail, inputLogin, inputFirstName, inputSecondName, inputDisplayName, inputPhone} = this.getChildrens();
    const { avatar } = this.getChildrens();

    const path = props.currentUser.avatar;
    const fullPath = path ? (apiPath.RESOURCES + path) : props.emptyAvatar;
    (avatar as Block).setProps({imagePath: fullPath});

    // ((inputEmail as Block).getChildrens()['input'] as Block).setProps({attributes: [
    //   { name: "name", value: "email" },
    //   { name: "id", value: "email" },
    //   { name: "placeholder", value: "Введите e-mail"},
    //   { name: "value", value: props.currentUser.email ? props.currentUser.email : '' }
    // ]})

    return `
      {{#if isLoading}}
        {{{ spinner }}}
      {{/if}}

      {{{ dialog }}}

      <div class="user__avatar-container">
          {{{ avatar }}}
          {{> TextLabelHBS classStyle="textLabel textLabel_subtitle" labelText=blockData.display_name}}
      </div>

      {{{ inputEmail }}}
      {{{ errorLabelEmail }}}

      {{{ inputLogin }}}
      {{{ errorLabelLogin }}}

      {{{ inputFirstName }}}
      {{{ errorLabelFirstName }}}

      {{{ inputSecondName }}}
      {{{ errorLabelSecondName }}}

      {{{ inputDisplayName }}}
      {{{ errorLabelDisplayName }}}

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
    const elemDisplayName = ((this.getChildrens()['inputDisplayName'] as Block).getChildrens()['input'] as Block).element;
    const elemPhone = ((this.getChildrens()['inputPhone'] as Block).getChildrens()['input'] as Block).element;

    result = result && this.checkLoginInput(elemLogin);
    result = result && this.checkEmailInput(elemEmail);
    result = result && this.checkFirstNameInput(elemFirstName);
    result = result && this.checkSecondNameInput(elemSecondName);
    result = result && this.checkDisplayNameInput(elemDisplayName);
    result = result && this.checkPhoneInput(elemPhone);
    return result;
  }
}

const mapStateToProps = (state : Record<string, unknown>) => {
  return {
    isLoading: state.isLoading,
    blockData: state.currentUser,
    emptyAvatar: state.emptyAvatar,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ChangeDataForm);
