import { BlockProps } from "./blockProps";

export type DataInputProps = BlockProps & {
  labelText: string;
  forName: string;
  type?: string;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  value?: string;
}
