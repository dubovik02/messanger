import Block from "../../core/block";
import { MenuItemProps } from "../../types/menu-item";
import { PictureButton } from "../pictureButton";
import { TextLabel } from "../textLabel";

export default class MenuItem extends Block {

  constructor(props : MenuItemProps) {

    super(
      'div',
      props,
      {
        label: new TextLabel({
          className: 'context-menu__item context-menu__link',
          labelText: props.menuText,
          events: [
            {
              eventName: 'click',
              eventFunc: (props.onMenuClick instanceof Function) ? props.onMenuClick : () => {}
            }
          ]
        }),
        button: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image pictureButton__image_context-menu',
          imagePath: props.buttonImage,
          events: [
            {
              eventName: 'click',
              eventFunc: (props.onButtonClick instanceof Function) ? props.onButtonClick : () => {}
            }
          ]
        })
      }
    );
  }

  override render(): string {

    return `
      {{{ button }}}
      {{{ label }}}
    `;
  }
}
