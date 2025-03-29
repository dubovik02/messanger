import Block from "../../core/block";
import { BlockProps } from "../../types/blockProps";
import { ChatSetProps } from "../../types/chatSetProps";
import { connect } from "../../utils/connect";
import { ChatMessage } from "../chatMsg";

type ExtendedChatProps = BlockProps & {
  activeChatIncomeMsg: ChatSetProps[];
}

class ChatSet extends Block {

  constructor(props : ExtendedChatProps) {
    super(
      'div',
      {
        ...props,
      },
      {
        chatMsg : ((props.activeChatIncomeMsg.map((item  : ChatSetProps) =>
          new ChatMessage({
            ...item,
          })
        ) as unknown) as Block[]),
      }
    );
  }

  override _render() {

    this._removeEvents();

    this._element.textContent = '';

    const props = this.getProperties() as ExtendedChatProps;
    this.setChildrens({ chatMsg : ((props.activeChatIncomeMsg.map((item  : ChatSetProps) =>
      new ChatMessage({
        ...item,
      })
    ) as unknown) as Block[])});

    const block = this.compile();

    if (Object.keys(this.getChildrens()).length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  override render(): string {

    return `
      {{#each chatMsg}}
        {{{ this }}}
      {{/each}}
    `;
  }

}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    activeChatIncomeMsg: state.activeChatIncomeMsg,
  };
};

export default connect(mapStateToProps)(ChatSet);
