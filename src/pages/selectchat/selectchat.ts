//import Block from "../../core/block";
import { ChatCard, Chats, Link, PictureButton, SearchInput } from "../../components";
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

class SelectChatPage extends Page {

  constructor() {
    super(
      {
        className: 'chat__root-container',
      },
      //child
      {
        linkProfile: new Link({
          className: "link link_grey",
          linkText: "Профиль >"
        }),

        searchInput: new SearchInput(),

        chats: new Chats({}),

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
                window.store.set({isLoading: true});
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
    return `
        {{#if isLoading}}
          {{{ spinner }}}
        {{/if}}

        <div class="chat__list-container">
          {{{ linkProfile }}}
          {{{ searchInput }}}

          {{{ chats }}}

        </div>
        <div class="chat__props-container">
          <div class="chat__detail-container">
            <div class="chat__user-container">
                <img class="chat__user-image"
                  src="
                    {{#if currentUser.avatar}}
                        {{ currentUser.avatar }}
                      {{else}}
                        ${emptyAvatar}
                    {{/if}}"
                alt="User's image">
                <h3 class="chat__user-name">{{ currentUser.first_name }}</h3>
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
  };
};

export default connect(mapStateToProps)(SelectChatPage);
