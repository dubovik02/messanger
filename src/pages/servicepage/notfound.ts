import ServicePage from "./servicepage";

export default class NotFoundPage extends ServicePage {

  constructor() {
    super()
  }

  override render(): string {

    return `
      {{> TextLabelHBS classStyle="textLabel textLabel_service-page-title" labelText='404' }}
      {{> TextLabelHBS classStyle="textLabel textLabel_service-page-subtitle" labelText="Не туда попали" }}
      <div class="service-page__button-container">
          {{{ linkBack }}}
      </div>
    `;
  }
}
