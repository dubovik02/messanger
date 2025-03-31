import Block from "../../core/block";
import LoginForm from "../../components/form/login/login";
import { TextLabel } from "../../components";
import Page from "../page";

export default class LoginPage extends Page {

  constructor() {
    super(
      //props
      {
        className : 'dialog dialog_small',
      },
      //childrens
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),
        form: ((new LoginForm({}) as unknown) as Block),
      }
    );
  }

  override render(): string {

    return `
      <div class="dialog__container">
        {{{ title }}}
        {{{ form }}}
      </div>
    `;
  }
}
