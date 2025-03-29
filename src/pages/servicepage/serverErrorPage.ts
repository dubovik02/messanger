import ServicePage from "./servicepage";

export default class ServerErrorPage extends ServicePage {

  constructor() {
    super()
  }

  override render(): string {

    return `
      {{> TextLabelHBS classStyle="textLabel textLabel_service-page-title" labelText='500' }}
      {{> TextLabelHBS classStyle="textLabel textLabel_service-page-subtitle" labelText="Мы уже фиксим" }}
      <div class="service-page__button-container">
          {{{ linkBack }}}
      </div>
    `;
  }
}
