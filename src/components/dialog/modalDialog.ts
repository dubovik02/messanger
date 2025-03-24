import Block from "../../core/block";
import { ModalDialogProps } from "../../types/modalDialogProps";

export default class ModalDialog extends Block {

  constructor(props : ModalDialogProps, childrens : Record<string, Block | Block[]>) {
    super('div', props, childrens);
  }

  override render(): string {
    return ``;
  }

}
