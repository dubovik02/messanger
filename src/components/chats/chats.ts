import Block from "../../core/block";
import { ChatCardProps } from "../../types/chatCardProps";
import { ChatsProps } from "../../types/chatsProps";
import { connect } from "../../utils/connect";
import { ChatCard } from "../chatCard";

class Chats extends Block {

  constructor(props : ChatsProps) {

    super(
      'div',
      props,
      {
        chats: props.userChats.map((item  : ChatCardProps) => new ChatCard(item)),
      }
    )
  }

  override render(): string {

    const props = this.getProperties() as ChatsProps;
    // перед рендерингом - вызываем обновление списка карточек чата
    // на статичных данных - с этой строкой не подтягивается карточка чата. Без - подтягивается
    this.getChildrens()['chats'] = (props.userChats.map((item : ChatCardProps) => new ChatCard( item ) ) );

    console.log(props);
    console.log(this.getChildrens()['chats']);

    return `
      {{#each chats}}
        {{{ this }}}
      {{/each}}
      `;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    userChats: state.cards
  };
};

export default connect(mapStateToProps)(Chats);
