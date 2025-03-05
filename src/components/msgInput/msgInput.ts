import Block from "../../core/block";
import { BlockProps } from "../../types/blockProps";

export default class MsgImport extends Block {

  constructor(props : BlockProps) {
    super(
      'input',
      props
    );
  }

  override render(): string {
    return ``;
  }
}
