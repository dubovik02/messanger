import { Link, TextLabel } from "../../components";
import Block from "../../core/block";

export default class ServicePage extends Block {

  constructor(title : string, subtitle : string) {

    super(
      'div',
      //main
      {
        className : 'service-page',
      },
      {
        title: new TextLabel ({
          className: 'textLabel textLabel_service-page-title',
          labelText: title
        }),

        subtitle: new TextLabel ({
          className: 'textLabel textLabel_service-page-subtitle',
          labelText: subtitle
        }),

        linkBack: new Link({
          className: "link",
          linkText: "Назад к чатам",
        }),
      }
    );
  }

  override render(): string {

    return `
      {{{ title }}}
      {{{ subtitle }}}
      <div class="service-page__button-container">
          {{{ linkBack }}}
      </div>
    `;
  }
}
