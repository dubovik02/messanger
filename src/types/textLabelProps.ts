import { BlockProps } from './blockProps';

export type textLabelProps = BlockProps & {
  labelText: string;
  inputId?: string;
}
