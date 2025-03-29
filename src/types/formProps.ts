import { BlockProps } from "./blockProps";

export type FormProps = BlockProps & {
  formState?: Record<string, string>;
}
