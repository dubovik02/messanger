import Block from "../../core/block";
import LoginForm from "../../components/form/login/login";
import { TextLabel } from "../../components";
import Page from "../page";
import { PageProps } from "../../types/pageProps";

export default class LoginPage extends Page {

  //constructor(pageProps: PageProps) {
  constructor() {
    super(
      //props
      // 'div',
      {
        className : 'dialog dialog_small',
      },
      //pageProps,
      //childrens
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Вход" }),
        form: new LoginForm({}),
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
