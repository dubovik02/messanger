import Block from "../../core/block";
import { ChatSetProps } from "../../types/chatSetProps";

export default class ChatSet extends Block {


  constructor(props : ChatSetProps) {
    super (
       'div',
       props
    );
  }

  override render(): string {
    return `
    <div class="chatSet__set-container">
        <div class="chatSet__message-container {{messageDirectionClass}}">
            <p class="chatSet__message">{{message}}</p>
            <div class="chatSet__message-props">
                <p class="chatSet__message-status">{{messageStatus}}</p>
                <p class="chatSet__message-time">{{messageTime}}</p>
            </div>
        </div>
    </div>
    `;
  }

}
