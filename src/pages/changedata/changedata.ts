import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { User } from "../../types/user";
import { ChangeDataForm } from "../../components/form/changedata";
import { PictureButton, TextLabel } from "../../components";
import { PageProps } from "../../types/pageProps";
import Page from "../page";
import Pathnames from "../../constants/pathnames";

export default class ChangeDataPage extends Page {

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
                //window.history.back();
                window.router.go(Pathnames.USER);
              }
            }
          ],
        }),

        //avatar: new PictureButton({
        // className: 'pictureButton',
        // pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          //imagePath: (pageProps!.pageParams!['user' as keyof object] as User)!.avatarPath ? (pageProps!.pageParams!['user' as keyof object] as User)!.avatarPath : emptyAvatar,
        //}),
        //avatarLabel: new TextLabel({className: "textLabel textLabel_subtitle", labelText: ''}),
        //avatarLabel: new TextLabel({className: "textLabel textLabel_subtitle", labelText: (pageProps!.pageParams!['user' as keyof object] as User)!.first_name! }),
        //form: new ChangeDataForm((pageProps!.pageParams!['user' as keyof object] as User)!),
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
