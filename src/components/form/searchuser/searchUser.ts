import Block from "../../../core/block";
import user from "../../../pages/user/user";
import ChatService from "../../../services/chat";
import UserService from "../../../services/user";
import { FormProps } from "../../../types/formProps";
import { connect } from "../../../utils/connect";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { TextLabel } from "../../textLabel";
import { Waiter } from "../../waiter";

type SearchUserFormProps = FormProps & {
  activeChatId: number;
}

class SearchUserForm extends FormWrapper {

  constructor(props : SearchUserFormProps) {

    super(
      {
        ...props,
        formState : {
          userLogin : ''
        },
        events: [
          {
            eventName: 'submit',
            eventFunc: (e : Event) => {
              e.preventDefault();
              const login = ((this.getChildrens()['inputLogin'] as Block).element.value);
              if (login) {
                window.store.set({isLoading : true});
                const data = {login : login};
                const service = new UserService();
                service.getUsersByLogin(data)
                .then((res) => {
                  const users = JSON.parse(res.responseText);
                  const usersId : number[] = [];
                  users.forEach((idx : Record<string, unknown>) => {
                    usersId.push(idx.id as number);
                  })
                  if (users) {
                    const chatService = new ChatService();
                    chatService.addUsersToChat(usersId, props.activeChatId)
                    .then(() => {
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  window.store.set({isLoading : false});
                  window.store.set({isDialogShow : false})
                });
              }
            }
          }
        ],
      },
      {

        loginLabel : new TextLabel({ className: "textLabel textLabel_text textLabel_text-grey", labelText: "Логин пользователя", inputId: "userLogin" }),
        inputLogin : new InputText({
          className: "inputText",
          attributes: [
            { name: "name", value: "login" },
            { name: "type", value: "text" },
            { name: "id", value: "login" },
            { name: "placeholder", value: "Введите логин пользователя" },
          ],
        }),
        errorLabelLogin: new TextLabel({className: "textLabel textLabel_text textLabel_text-red", labelText: "" }),

        buttonLoad : new Button({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Найти',
        }),

        spinner: new Waiter()
      }
    );
  }

  override render(): string {

    return `
      {{{ loginLabel }}}
      {{{ inputLogin }}}
      {{{ errorLabelLogin }}}
      {{{ buttonLoad }}}
    `;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    activeChatId: state.activeChatId
  };
};

export default connect(mapStateToProps)(SearchUserForm);
