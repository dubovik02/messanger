import Block from "../../core/block";
import { ChatCardProps } from "../../types/chatCardProps";
import emptyAvatar from "../../assets/emptyAvatar.png";

export default class ChatCard extends Block {

  constructor(props: ChatCardProps) {

    if (!props.className) {
      props.className = 'class';
    }

    super(
      'div',
      props,
    );
  }

  override render(): string {

    const props = this.getProperties() as ChatCardProps;
    let timeStamp = '';

    if (props.last_message) {
      const time = new Date((this.getProperties() as ChatCardProps).last_message.time);
      if (time) {
        timeStamp = time.getHours() + ':' + time.getMinutes();
      }
    }

    return `
      <div {{#if isActive}} class="chatCard chatCard_selected" {{else}} class="chatCard" {{/if}}>
        <div class="chatCard__image-container">
          <img class="chatCard__image" {{#if avatar}} src="{{avatar}}" {{else}} src="${emptyAvatar}" {{/if}} alt="User's image">
        </div>
        <div class="chatCard__chat-container">
            <h3 class="chatCard__chat-name" >{{title}}</h3>
            <p class="chatCard__last-chat">
              {{#if last_message}}
                <span class="chatCard__last-chat chatCard__last-chat_bold">
                  {{last_message.user.first_name}}
                </span>
                  {{last_message.content}}
              {{else}}
                <span class="chatCard__last-chat chatCard__last-chat_bold">
                </span>
                Пока нет сообщений
              {{/if}}
            </p>
        </div>
        <div class="chatCard__msg-container">
            <p class="chatCard__time">${timeStamp}</p>
            <p class="chatCard__count">{{unread_count}}</p>
        </div>
      </div>
    `;
  }
}
