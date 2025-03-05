import Block from "../../core/block";
import { ChatCardProps } from "../../types/chatCardProps";

export default class ChatCard extends Block {
  constructor(props: ChatCardProps) {

    if (!props.className) {
      props.className = 'chatCard';
    }
    if (props.selected) {
      props.className = props.className + ' chatCard_selected';
    }

    super(
      'div',
      props,
    );
  }

  override render(): string {
    return `
      <div class="chatCard__image-container">
        <img class="chatCard__image" src="{{imagePath}}" alt="User's image">
      </div>
      <div class="chatCard__chat-container">
          <h3 class="chatCard__chat-name" >{{chatName}}</h3>
          <p class="chatCard__last-chat"><span class="chatCard__last-chat chatCard__last-chat_bold">{{owner}}</span> {{lastChat}}</p>
      </div>
      <div class="chatCard__msg-container">
          <p class="chatCard__time">{{time}}</p>
          <p class="chatCard__count">{{count}}</p>
      </div>
    `;
  }
}
