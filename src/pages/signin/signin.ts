import Block from "../../core/block";
import { TextLabel } from "../../components";
import { SigninForm } from "../../components/form/signin";

export default class SigninPage extends Block {
  constructor() {
    super(
      'div',
      {
        className : 'dialog dialog_large',
      },
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),
        form: new SigninForm()
      },
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
