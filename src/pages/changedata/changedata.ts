import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import { ChangeDataForm } from "../../components/form/changedata";
import Page from "../page";
import Pathnames from "../../constants/pathnames";

export default class ChangeDataPage extends Page {

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

        form: ((new ChangeDataForm(
          {
            className: 'dialog__form',
            formState: {
              email: '',
              login: '',
              first_name: '',
              second_name: '',
              display_name: '',
              phone: '',
            }
          }
        ) as unknown) as Block),
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
