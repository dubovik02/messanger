import WebSocketApi from "../../api/ws-api";
import Block from "../../core/block";
import AuthService from "../../services/auth";
import ChatService from "../../services/chat";
import { ChatCardProps } from "../../types/chatCardProps";
import { ChatSetProps } from "../../types/chatSetProps";
import { ChatsProps } from "../../types/chatsProps";
import { connect } from "../../utils/connect";
import { ChatCard } from "../chatCard";
import pathnames from "../../constants/pathnames";

type ExtendedChatsProps = ChatsProps & {
  userChats: ChatCardProps[];
  activeIndex: number;
  currentUser: Record<string, unknown>;
  activeChatIncomeMsg: ChatSetProps[];
  token: string;
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
                  this.connectChat(index, item);
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
              this.connectChat(index, item);
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
    .catch(() => {
      window.router.go(pathnames.SERVER_ERR);
    })
    .finally(() => {

    });
  }

  getNewChatMsg(chatId : number) {
    const props = this.getProperties() as ExtendedChatsProps;
    if (props.token && chatId && props.currentUser.id) {
      WebSocketApi.connect(chatId, props.currentUser.id as number, props.token, this.makeIncomeMessage)
      .then((res) => {
        (res as WebSocket).send(JSON.stringify({
          content: '0',
          type: 'get old',
        }));
      })
      .catch(() => {
        window.router.go(pathnames.SERVER_ERR);
      })
    }
  }

  setUpMsgListener(chatId : number) {

    const service = new AuthService();
    service.getToken(chatId)
    .then((res) => {
      const token = JSON.parse(res.responseText).token;
      window.store.set({ token: token });
      this.getNewChatMsg(chatId);
    })
    .catch(() => {
      window.router.go(pathnames.SERVER_ERR);
    })
    .finally(() => {
      window.store.set({ isLoading : false });
    })
  }

  makeIncomeMessage = (data : string) => {
    let incomeMsg = (this.getProperties() as ExtendedChatsProps).activeChatIncomeMsg;
    const msg = JSON.parse(data);
    if (Array.isArray(msg)) {
      if (msg.length) {
        incomeMsg = incomeMsg.concat(msg);
      }
    }
    else {
      incomeMsg.push(msg);
    }
    window.store.set({ activeChatIncomeMsg : incomeMsg });
  }

  connectChat(index : number, item : ChatCardProps) {
    window.store.set({ isLoading : true });
    window.store.set({ activeChatIncomeMsg : [] });
    this.setActiveindex(index, item.id)
    this.getActiveChatUsers(item.id);
    this.setUpMsgListener(item.id);
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    userChats: state.userChats,
    activeChatUsers: state.activeChatUsers,
    currentUser : state.currentUser,
    activeChatIncomeMsg: state.activeChatIncomeMsg,
    activeChatOutcomeMsg: state.activeChatOutcomeMsg,
    token: state.token
  };
};

export default connect(mapStateToProps)(Chats);
