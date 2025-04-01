import Block from "../../core/block";
import { ChatSetProps } from "../../types/chatSetProps";
import { connect } from "../../utils/connect";


class ChatMessage extends Block {

  constructor(props : ChatSetProps) {
    super(
      'div',
      props
    );
  }

  override render(): string {

    const props = this.getProperties() as ChatSetProps;

    let timeStamp = '';
    const time = new Date(props.time);
    if (time) {
      timeStamp = time.getHours() + ':' + time.getMinutes();
    }

    let directionClass = '';
    const user = props.user_id;
    if (user != props.currentUser.id) {
      directionClass = 'chatSet__message-container_for-me'
    }
    else{
      directionClass = 'chatSet__message-container_from-me'
    }

    return `
    <div class="chatSet__set-container">
        <div class="chatSet__message-container ${directionClass}">
            <p class="chatSet__message">{{content}}</p>
            <div class="chatSet__message-props">
                <p class="chatSet__message-status">{{messageStatus}}</p>
                <p class="chatSet__message-time">${timeStamp}</p>
            </div>
        </div>
    </div>
    `;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    currentUser : state.currentUser,
  };
};

export default connect(mapStateToProps)(ChatMessage);

