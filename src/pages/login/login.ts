import Block from "../../core/block";
import LoginForm from "../../components/form/login/login";
import { TextLabel } from "../../components";

export default class LoginPage extends Block {

  constructor() {
    super(
      //props
      'div',
      {
        className : 'dialog dialog_small',
      },
      //childrens
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),
        form: new LoginForm(),
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
