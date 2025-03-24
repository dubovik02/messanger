import Block from "../../core/block";
import { ChatCardProps } from "../../types/chatCardProps";

export default class ChatCard extends Block {

  constructor(props: ChatCardProps) {

    if (!props.className) {
      props.className = 'chatCard';
    }

    if (props.isActive) {
      props.className = props.className + ' chatCard_selected';
    }

    super(
      'div',
      props,
    );
  }

  override render(): string {

//     avatar
// :
// null
// created_by
// :
// 3646
// id
// :
// 53717
// last_message
// :
// null
// title
// :
// "Новый чат"
// unread_count
// :
//0
    const props = this.getProperties() as ChatCardProps;
    let timeStamp = '';

    if (props.last_message) {
      const time = new Date((this.getProperties() as ChatCardProps).last_message.time);
      if (time) {
        timeStamp = time.getHours() + ':' + time.getMinutes();
      }
    }

    return `
      <div class="chatCard__image-container">
        <img class="chatCard__image" src="{{avatar}}" alt="User's image">
      </div>
      <div class="chatCard__chat-container">
          <h3 class="chatCard__chat-name" >{{title}}</h3>
          <p class="chatCard__last-chat">
            <span class="chatCard__last-chat chatCard__last-chat_bold">{{last_message.user.first_name}}</span>
            {{last_message.content}}
          </p>
      </div>
      <div class="chatCard__msg-container">
          <p class="chatCard__time">${timeStamp}</p>
          <p class="chatCard__count">{{unread_count}}</p>
      </div>
    `;
  }
}
