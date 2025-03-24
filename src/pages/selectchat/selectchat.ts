//import Block from "../../core/block";
import { ChatCard, Chats, Link, PictureButton, SearchInput, TextLabel } from "../../components";
//import { ChatCardProps } from "../../types/chatCardProps";
import dots from '../../assets/dots.png';
import emptyAvatar from '../../assets/emptyAvatar.png';
import ChatSet from "../../components/chatSet/chatSet";
import { MessageForm } from "../../components/form/message";
import Page from "../page";
//import { PageProps } from "../../types/pageProps";
import Pathnames from "../../constants/pathnames";
import { connect } from "../../utils/connect";
import ChatService from "../../services/chat";
import { Waiter } from "../../components/waiter";
import { PageProps } from "../../types/pageProps";
import apiPath from "../../constants/api";
import Block from "../../core/block";

type SelectChatPageProps = PageProps & {
  currentUser : Record<string, string>;
  emptyAvatar : string;
}

class SelectChatPage extends Page {

  constructor(props : SelectChatPageProps) {

    super(
      {
        ...props,
        className: 'chat__root-container',
      },
      //child
      {
        linkProfile: new Link({
          className: "link link_grey",
          linkText: "Профиль >"
        }),

        avatar: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'chat__user-image',
          imagePath: props.currentUser.avatar ? (apiPath.RESOURCES + props.currentUser.avatar) : props.emptyAvatar,
        }),

        searchInput: new SearchInput(),

        chatsList: new Chats(
          {
            className: 'chats-container',
          }
        ),

        chatsSet: [],

        dotsButton: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image',
          imagePath: dots,
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

        form: new MessageForm({}),
        spinner: new Waiter()
      }

    );
  }

  override render(): string {
    const avatarElem = this.getChildrens()['avatar'] as Block;
    const path = (this.getProperties() as SelectChatPageProps).currentUser.avatar;
    const fullPath = path ? (apiPath.RESOURCES + path) : (this.getProperties() as SelectChatPageProps).emptyAvatar;
    avatarElem.setProps({imagePath: fullPath});

    return `
        {{#if isLoading}}
          {{{ spinner }}}
        {{/if}}

        <div class="chat__list-container">
          {{{ linkProfile }}}
          {{{ searchInput }}}

          {{{ chatsList }}}

        </div>
        <div class="chat__props-container">
          <div class="chat__detail-container">
            <div class="chat__user-container">
                {{{ avatar }}}
                <h3 class="chat__user-name">{{ currentUser.display_name }}</h3>
            </div>
            {{{ dotsButton }}}
          </div>
          <div class="chat__talk-container">
            <p class="chat__date">1 марта</p>
            {{#each chatsSet}}
              {{{ this }}}
            {{/each}}
          </div>
          {{{ form }}}
        </div>
    `;
  }
}

const mapStateToProps = (state : Record<string, unknown>) => {
  return {
    isLoading: state.isLoading,
    currentUser: state.currentUser,
    emptyAvatar: state.emptyAvatar,
  };
};

export default connect(mapStateToProps)(SelectChatPage);
