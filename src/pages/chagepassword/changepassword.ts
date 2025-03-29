import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { User } from "../../types/user";
import { ChangePasswordForm } from "../../components/form/changepassword";
import { PictureButton, TextLabel } from "../../components";
import { PageProps } from "../../types/pageProps";
import Page from "../page";
import Pathnames from "../../constants/pathnames";

export default class ChangePasswordPage extends Page {

  constructor() {

    super(
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
                window.router.go(Pathnames.USER);
              }
            }
          ],
        }),

        form: ((new ChangePasswordForm(
          {
            className: 'dialog__form',
            formState: {
              oldPassword: '',
              newPassword: '',
            },
          },
        ) as unknown) as Block)
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
