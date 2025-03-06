import Block from "../../core/block";
import { InputTextProps } from "../../types/inputTextProps";

export default class inputText extends Block {

  constructor(props : InputTextProps) {
    super('input', props);
  }

  override render(): string {
    return ``;
  }
}
