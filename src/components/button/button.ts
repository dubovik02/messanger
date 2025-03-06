import Block from "../../core/block";
import { ButtonProps } from "../../types/buttonProps";

export default class Button extends Block {
  constructor(props : ButtonProps) {
    super('button', props);
  }

  override render(): string {
    return `{{buttonText}}`;
  }
}
