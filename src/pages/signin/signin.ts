import Block from "../../core/block";
import { TextLabel } from "../../components";
import { SigninForm } from "../../components/form/signin";
import { PageProps } from "../../types/pageProps";
import Page from "../page";

export default class SigninPage extends Page {
  //constructor(pageProps : PageProps) {
  constructor() {
    super(
      {
        className : 'dialog dialog_large',
      },
      //pageProps,
      {
        title : new TextLabel({ className: "textLabel textLabel_subtitle", labelText: "Регистрация" }),
        form: new SigninForm({})
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
