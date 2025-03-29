import Block from "../../core/block";
import { ContextMenuProps } from "../../types/contextMenuProps";

export default class ContextMenu extends Block {

  constructor(props : ContextMenuProps, childrens : Record<string, Block | Block[]>) {
    super('div', props, childrens)
  }

  override render(): string {
    return `
      {{#each menu}}
        {{{ this }}}
      {{/each}}
    `;
  }

}
