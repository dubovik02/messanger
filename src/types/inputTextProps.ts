import { BlockProps } from "./blockProps";

export type InputTextProps = BlockProps & {
  type?: string;
  name?: string;
  id?: string;
  minlength?: number,
  maxlength?: number,
  placeholder?: string;
}
