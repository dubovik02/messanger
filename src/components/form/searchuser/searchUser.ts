import Block from "../../../core/block";
import ChatService from "../../../services/chat";
import UserService from "../../../services/user";
import { FormProps } from "../../../types/formProps";
import { connect } from "../../../utils/connect";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper";
import { InputText } from "../../inputText";
import { TextLabel } from "../../textLabel";
import { Waiter } from "../../waiter";
import pathnames from "../../../constants/pathnames";

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
                  usersId.push(users[0].id as number);
                  if (users) {
                    const chatService = new ChatService();
                    chatService.addUsersToChat(usersId, props.activeChatId)
                    .then(() => {
                      const service = new ChatService();
                      service.getChatUsers((this.getProperties() as SearchUserFormProps).activeChatId)
                      .then((res) => {
                        const users = JSON.parse(res.responseText);
                        window.store.set( { activeChatUsers: users });
                      })
                      .catch(() => {
                        window.router.go(pathnames.SERVER_ERR);
                      });
                    })
                    .catch(() => {
                      window.router.go(pathnames.SERVER_ERR);
                    })
                  }
                })
                .catch(() => {
                  window.router.go(pathnames.SERVER_ERR);
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
