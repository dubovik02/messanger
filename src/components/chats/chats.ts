import Block from "../../core/block";
import { connect } from "../../utils/connect";

class Chats extends Block {

  constructor() {

    super(
      'div', { }, { }
    )
  }

  override render(): string {
    return `
      {{#each userChats}}
        {{{ this }}}
      {{/each}}`;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    userChats: state.userChats,
  };
};

export default connect(mapStateToProps)(Chats);
