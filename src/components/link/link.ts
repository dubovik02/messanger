import Block from "../../core/block";
import { LinkProps } from "../../types/linkProps";

export default class Link extends Block {

  constructor(props : LinkProps) {
    super('a', props);
  }

  override render(): string {
    return `{{ linkText }}`;
  }
}
