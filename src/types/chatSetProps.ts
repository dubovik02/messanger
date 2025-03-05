import { BlockProps } from "./blockProps";

export type ChatSetProps = BlockProps & {
  message: string;
  messageDirectionClass?: string;
  messageStatus?: string;
  messageTime?: string;
}
