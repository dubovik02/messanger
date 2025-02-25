import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { Button, DataInput, PictureButton, TextLabel } from "../../components";
import { User } from "../../types/user";

export default class ChangePasswordPage extends Block {

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

        oldPassInp: new DataInput({
          className: 'dataInput',
          type: "password",
          forName: "oldPassword",
          labelText: "Старый пароль",
          placeholder: "Введите введите старый пароль",
        }),

        newPassInp: new DataInput({
          className: 'dataInput',
          type: "password",
          forName: "newPassword",
          labelText: "Новый пароль",
          placeholder: "Введите введите новый пароль",
        }),

        repeatPassInp: new DataInput({
          className: 'dataInput',
          type: "password",
          forName: "repeatPassword",
          labelText: "Новый пароль еще раз",
          placeholder: "Новый пароль еще раз",
        }),

        buttonSave :  new Button ({
          className: "button",
          attributes: [{name: "type", value: "button"}],
          buttonText: 'Сохранить',
        }),
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
          {{{ newPassInp }}}
          {{{ oldPassInp }}}
          {{{ repeatPassInp }}}
          <div class="user__button-container user__button-container_center">
            {{{ buttonSave }}}
          </div>
      </div>
    `;
  }
}
