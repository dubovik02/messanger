import Block from "../../core/block";
import { ChatCard, Link, PictureButton, SearchInput } from "../../components";
import { ChatCardProps } from "../../types/chatCardProps";
import dots from '../../assets/dots.png';
import ChatSet from "../../components/chatSet/chatSet";
import { MessageForm } from "../../components/form/message";

export default class SelectChatPage extends Block {

  protected chatList : unknown;

  constructor(chats : ChatCard[], chatsSet : ChatSet[]) {
    super(
      'div',
      //main
      {
        className: 'chat__root-container',
      },
      //child
      {
        linkProfile: new Link({
          className: "link link_grey",
          linkText: "Профиль >",
        }),

        searchInput: new SearchInput(),

        chats: chats,

        chatsSet: chatsSet,

        dotsButton: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image',
          imagePath: dots,
        }),

        form: new MessageForm(),
      }

    );

    this.chatList = document.querySelector('.chat__list-container');
  }

  override render(): string {
    //текущий чат - собеседник
    let currentChat : any;
    if (Array.isArray(this.getChildrens().chats)) {
      const arr = this.getChildrens().chats as ChatCard[];
      arr.forEach((item : ChatCard) => {
        if ((item.getProperties() as ChatCardProps).selected) {
          currentChat = item;
        }
      })
    }
    const path = (currentChat.getProperties() as ChatCardProps)!.imagePath;
    const chatName = (currentChat.getProperties() as ChatCardProps)!.chatName;


    return `
        <div class="chat__list-container">
          {{{ linkProfile }}}
          {{{ searchInput }}}
          {{#each chats}}
            {{{ this }}}
          {{/each}}
        </div>
        <div class="chat__props-container">
          <div class="chat__detail-container">
            <div class="chat__user-container">
                <img class="chat__user-image" src="${path}" alt="User's image">
                <h3 class="chat__user-name">${chatName}</h3>
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
