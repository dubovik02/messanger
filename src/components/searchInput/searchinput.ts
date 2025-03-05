import { InputText } from "../inputText";

export default class SearchInput extends InputText {

  constructor() {
    super(
      {
        className: 'searchInput',
        attributes: [
          {
            name: 'type',
            value: 'text'
          },
          {
            name: 'name',
            value: 'search',
          },
          {
            name: 'placeholder',
            value: 'Поиск',
          }
        ]
      }
    );
  }
}
