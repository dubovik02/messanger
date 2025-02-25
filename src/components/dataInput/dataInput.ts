import Block from "../../core/block";
import { DataInputProps } from "../../types/dataInputProps";

export default class DataInput extends Block {

  constructor(props : DataInputProps) {

    super(
      'div',
      props
    );
  }

  override render(): string {
    return `
      <label class="dataInput__label" for="{{forName}}">{{labelText}}</label>
      <input class="dataInput__input"
        type={{type}}
        name={{forName}}
        id={{forName}}
        minlength={{minTextSize}}
        maxlength={{maxTextSize}}
        placeholder="{{placeholder}}"
        value={{value}}
      >
    `;
  }
}
