import { BlockProps } from "./blockProps";

export type ChatCardProps = BlockProps & {
  selected: boolean;
  chatName: string;
  owner?: string;
  lastChat: string;
  imagePath?: string;
  time: string;
  count: number;
}
