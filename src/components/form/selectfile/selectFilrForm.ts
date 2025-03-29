import UserService from "../../../services/user";
import { FormProps } from "../../../types/formProps";
import { Button } from "../../button";
import { FormWrapper } from "../../form-wrapper"
import { InputText } from "../../inputText";
import { Waiter } from "../../waiter";

export default class SelectFileForm extends FormWrapper {

  constructor(props : FormProps) {

    super(
      {
        ...props,
        events: [
          {
            eventName: 'submit',
            eventFunc: (e : Event) => {
              e.preventDefault();
              const form = new FormData(this.element);
              const result = form.get('avatar') as File;
              if (result.size != 0) {
                const service = new UserService();
                service.changeUserAvatar(form);
              }
            }
          }
        ],
      },
      //
      {

        inputFile : new InputText({
          className: "inputText",
          attributes: [
            { name: "name", value: "avatar"},
            { name: "type", value: "file" },
            { name: "id", value: "avatar" },
            { name: "accept", value: "image/*"}
          ],
        }),

        buttonLoad : new Button({
          className: "button",
          attributes: [{name: "type", value: "submit"}],
          buttonText: 'Загрузить',
        }),

        spinner: new Waiter()
      }

    )
  }

  override render(): string {
    return `
      {{#if isLoading}}
        {{{ spinner }}}
      {{/if}}

      {{{ inputFile }}}
      {{{ buttonLoad }}}
    `;
  }
}
