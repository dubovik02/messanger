import Block from "../../core/block";
import { PictureButtonProps } from "../../types/pictureButtonProps";

export default class PictureButton extends Block {
  constructor(props : PictureButtonProps) {

    super(
      'a',
      props,
    );
  }

  override render(): string {
    return `<img class="{{pictureStyleClass}}" src="{{imagePath}}" alt="picture-button">`;
  }
}
