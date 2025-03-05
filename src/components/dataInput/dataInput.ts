import Block from "../../core/block";
import { DataInputProps } from "../../types/dataInputProps";

export default class DataInput extends Block {

  constructor(props : DataInputProps, input : Record<string, Block | Block[]>) {

    super(
      'div',
      props,
      input
    );
  }

  override render(): string {
    return `
      <label class="dataInput__label" for="{{forName}}">{{labelText}}</label>
      {{{ input }}}
    `;
  }
}
