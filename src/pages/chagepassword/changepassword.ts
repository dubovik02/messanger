import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { User } from "../../types/user";
import { ChangePasswordForm } from "../../components/form/changepassword";
import { PictureButton, TextLabel } from "../../components";
import { PageProps } from "../../types/pageProps";
import Page from "../page";

export default class ChangePasswordPage extends Page {

  //constructor(user : User) {
  //constructor(pageProps : PageProps) {
  constructor() {

    super(
      //'div',
      //main
      {
        className: 'user',
      },
      //children
      {
        backButton: new ArrowButton({
          className: 'arrowButton',
          imagePath: arrowLeft,
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                window.history.back();
              }
            }
          ],
        }),

        form: new ChangePasswordForm(
          {
            className: 'dialog__form',
            formState: {
              oldPassword: '',
              newPassword: '',
            },
          },
        )
      }
    );
  }

  override render(): string {

    return `
      <div class="user__back-container">
        {{{ backButton }}}
      </div>
      <div class="user__container">
          {{{ form }}}
      </div>
    `;
  }
}
