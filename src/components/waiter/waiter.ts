import Block from "../../core/block";

export default class Waiter extends Block {

  constructor(){
    super(
      'div',
      {
        className: 'preloader-container'
      }
    )
  }

  override render(): string {
    return `
            <i class="circle-preloader"></i>
            <p class="preloader-container__title"></p>
    `;
  }
}
