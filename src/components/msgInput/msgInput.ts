import Block from "../../core/block";

export default class MsgImport extends Block {

  constructor() {
    super(
      'input',
      {
        className: 'msgInput',
        attributes: [
          {
            name: 'type',
            value: 'text',
          },
          {
            name: 'name',
            value: 'message',
          },
          {
            name: 'placeholder',
            value: 'Сообщение',
          },
        ]
      }

    );
  }

  override render(): string {
    return ``;
  }
}
