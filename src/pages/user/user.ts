import ArrowButton from "../../components/arrowButton/arrowButton";
import Block from "../../core/block";
import arrowLeft from "../../assets/arrowL.png";
import { Link, PictureButton } from "../../components";
import { PageProps } from "../../types/pageProps";
import Page from "../page";
import Pathnames from "../../constants/pathnames";
import { connect } from "../../utils/connect";
import AuthService from "../../services/auth";
import apiPath from "../../constants/api";

type UserPageProps = PageProps & {
  currentUser : Record<string, string>;
  emptyAvatar : string;
}

class UserPage extends Page {

  constructor(props : UserPageProps) {

    super(
      //main
      {
        ...props,
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
                //window.router.back();
                window.router.go(Pathnames.CHAT);
              }
            }
          ],
        }),

        avatar: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image pictureButton__image_round pictureButton__image_size130',
          imagePath: props.currentUser.avatar ? (apiPath.RESOURCES + props.currentUser.avatar) : props.emptyAvatar,
        }),

        linkChangeData: new Link({
          className: "link link_uderlined",
          linkText: "Изменить данные",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                window.router.go(Pathnames.CHANGEDATA);
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
                window.router.go(Pathnames.PASSWORD);
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
                auth.logout();
              }
            }
          ],
        }),
      }
    );
  }

  override render(): string {

    const avatarElem = this.getChildrens()['avatar'] as Block;
    const path = (this.getProperties() as UserPageProps).currentUser.avatar;
    const fullPath = path ? (apiPath.RESOURCES + path) : (this.getProperties() as UserPageProps).emptyAvatar;
    avatarElem.setProps({imagePath: fullPath});

    return `
      <div class="user__back-container">
        {{{ backButton }}}
      </div>
      <div class="user__container">
          <div class="user__avatar-container">
            {{{ avatar }}}
            {{> TextLabelHBS classStyle="textLabel textLabel_subtitle" labelText=currentUser.display_name}}
          </div>
          {{> DataInputHBS className="dataInput" value=currentUser.email labelText="Почта" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.login labelText="Логин" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.first_name labelText="Имя" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.second_name labelText="Фамилия" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.display_name labelText="Имя в чате" readonly="readonly" }}
          {{> DataInputHBS className="dataInput" value=currentUser.phone labelText="Телефон" readonly="readonly" }}

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
    emptyAvatar: state.emptyAvatar,
  };
};

export default connect(mapStateToProps)(UserPage);

