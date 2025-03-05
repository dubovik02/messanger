import Block from "../../core/block";
import { textLabelProps } from "../../types/textLabelProps";

export default class TextLabel extends Block {

  constructor(props: textLabelProps) {
    super('label', props);
  }

  override render(): string {
    return `{{ labelText }}`;
  }
}
