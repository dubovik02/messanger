import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { User } from "../../types/user";
import { ChangeDataForm } from "../../components/form/changedata";
import { PictureButton, TextLabel } from "../../components";

export default class ChangeDataPage extends Block {

  constructor(user : User) {

    super(
      'div',
      //main
      {
        className: 'user',
      },
      //children
      {
        backButton: new ArrowButton({
          className: 'arrowButton',
          imagePath: arrowLeft,
        }),

        avatar: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          imagePath: user.avatarPath ? user.avatarPath : emptyAvatar,
        }),

        avatarLabel: new TextLabel({className: "textLabel textLabel_subtitle", labelText: user.first_name! }),
        form: new ChangeDataForm(user),
      }
    );
  }

  override render(): string {

    return `
      <div class="user__back-container">
        {{{ backButton }}}
      </div>
      <div class="user__container">
          <div class="user__avatar-container">
            {{{ avatar }}}
            {{{ avatarLabel }}}
          </div>
          {{{ form }}}
      </div>
    `;
  }
}
