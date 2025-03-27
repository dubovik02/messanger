import Block from "../../core/block";
import ChatService from "../../services/chat";
import { ChatCardProps } from "../../types/chatCardProps";
import { ChatsProps } from "../../types/chatsProps";
import { connect } from "../../utils/connect";
import { ChatCard } from "../chatCard";

type ExtendedChatsProps = ChatsProps & {
  userChats: ChatCardProps[];
  activeIndex: number;
}

class Chats extends Block {

  constructor(props : ExtendedChatsProps) {

    super(
      'div',
      props,
      {
        chats: props.userChats.map((item  : ChatCardProps, index : number) =>
          new ChatCard({
            ...item,
            events : [
              {
                eventName : 'click',
                eventFunc : () => {
                  this.setActiveindex(index, item.id)
                  this.getActiveChatUsers(item.id);
                },
              }
            ]
          })
        ),
      }
    )
  }

  override _render() {
    this._removeEvents();

    this._element.textContent = '';

    const props = this.getProperties() as ExtendedChatsProps;
    const cardsProps = props.userChats as ChatCardProps[];
    this.setChildrens({ chats: cardsProps.map((item  : ChatCardProps, index : number) =>
      new ChatCard({
        ...item,
        events : [
          {
            eventName : 'click',
            eventFunc : () => {
              this.setActiveindex(index, item.id)
              this.getActiveChatUsers(item.id);
            },
          }
        ]
      })
    ), } );

    const block = this.compile();

    if (Object.keys(this.getChildrens()).length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  override render(): string {

    const { activeIndex } = this.getProperties() as ExtendedChatsProps;
    const chats = this.getChildrens()['chats'] as Block[];

    chats.forEach((chatCard : ChatCard, index : number) => {
      if (index == activeIndex) {
        chatCard.setProps({isActive : true});
      }
      else {
        chatCard.setProps({isActive: false});
      }
    });

    return `
      {{#each chats}}
        {{{ this }}}
      {{/each}}
      `;
  }

  setActiveindex = (index : number, chatId : number) => {
    this.setProps({activeIndex : index});
    window.store.set({activeChatId : chatId});
  }

  getActiveChatUsers(chatId : number) {
    const service = new ChatService();
    service.getChatUsers(chatId)
    .then((res) => {
      const users = JSON.parse(res.responseText);
      window.store.set( { activeChatUsers: users });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {

    });
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    userChats: state.userChats,
    activeChatUsers: state.activeChatUsers
  };
};

export default connect(mapStateToProps)(Chats);
