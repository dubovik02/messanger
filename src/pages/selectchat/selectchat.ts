import Block from "../../core/block";
import { ChatCard, Link, MsgInput, PictureButton, SearchInput } from "../../components";
import { ChatCardProps } from "../../types/chatCardProps";
import clip from '../../assets/clip.png';
import dots from '../../assets/dots.png';
import arrowRight from '../../assets/arrowR.png';
import ChatSet from "../../components/chatSet/chatSet";
import ArrowButton from "../../components/arrowButton/arrowButton";

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

        clipButton: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image',
          imagePath: clip,
        }),

        messageInput: new MsgInput(),

        buttonSend: new ArrowButton({
            className: 'arrowButton',
            imagePath: arrowRight,
        })
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
          <div class="chat__msg-container">
            {{{ clipButton }}}
            {{{ messageInput }}}
            {{{ buttonSend }}}
          </div>
        </div>
    `;
  }
}
