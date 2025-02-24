import Block from "../../core/block";
import { ArrowButtonProps } from "../../types/arrowButton";

export default class ArrowButton extends Block {

  constructor(props : ArrowButtonProps) {

    super(
      'a',
      props
    );


  }

  override render(): string {
    return `
      <img class="arrowButton__image" src={{imagePath}} alt="arrow">
    `;
  }
}
