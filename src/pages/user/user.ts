import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import emptyAvatar from "../../assets/emptyAvatar.png";
import { DataInput, Link, PictureButton, TextLabel } from "../../components";
import { User } from "../../types/user";
import inputText from "../../components/inputText/inputText";
import { PageProps } from "../../types/pageProps";
import Page from "../page";
import Pathnames from "../../constants/pathnames";
import { connect } from "../../utils/connect";
import AuthService from "../../services/auth";

//export default class UserPage extends Block {
class UserPage extends Page {

  constructor() {

    super(
     // 'div',
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

        linkChangeData: new Link({
          className: "link link_uderlined",
          linkText: "Изменить данные",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                document.location.pathname = Pathnames.CHANGEDATA;
              }
            }
          ],
        }),

        linkChangePass: new Link({
          className: "link link_uderlined",
          linkText: "Изменить пароль",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                document.location.pathname = Pathnames.PASSWORD;
              }
            }
          ],
        }),

        linkExit: new Link({
          className: "link link_uderlined link_red",
          linkText: "Выйти",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                const auth = new AuthService();
                auth.logout()
                .then(() => {
                  window.router.go(Pathnames.LOGIN);
                  window.store.set({currentUser: null});
                })
                .catch((err) => {
                  console.log(err);
                })
              }
            }
          ],
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
            {{> PictureButtonHBS
              classModif="pictureButton_cursor-default"
              picStyleClass="pictureButton__image pictureButton__image_round pictureButton__image_size130"
              picSrc=currentUser.avatar
            }}
            {{> TextLabelHBS labelText=currentUser.display_name}}
          </div>
          {{> DataInputHBS className="dataInput" value=currentUser.email labelText="Почта" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.login labelText="Логин" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.first_name labelText="Имя" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.second_name labelText="Фамилия" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.display_name labelText="Имя в чате" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.phone labelText="Телефон" readonly="readonly" }}

          {{{ inputEmail }}}
          {{{ inputLogin }}}
          {{{ inputFirstName }}}
          {{{ inputSecondName }}}
          {{{ inputDisplayName }}}
          {{{ inputPhone }}}

          <div class="user__button-container">
            {{{ linkChangeData }}}
            {{{ linkChangePass }}}
            {{{ linkExit }}}
          </div>
      </div>
    `;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    currentUser: state.currentUser,
    emptyAvatar: state.emptyAvatar
  };
};

export default connect(mapStateToProps)(UserPage);
