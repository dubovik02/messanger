import { BlockProps } from "./blockProps";

export type ChatSetProps = BlockProps & {
  content: string;
  messageDirectionClass?: string;
  messageStatus?: string;
  time: string;
  type?: string;
  user_id: number;
  id: number;
  currentUser: Record<string, unknown>;
}
