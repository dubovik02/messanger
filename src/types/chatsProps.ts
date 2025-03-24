import { BlockProps } from "./blockProps";
import { ChatCardProps } from "./chatCardProps";

export type ChatsProps = BlockProps & {
  cards: ChatCardProps[];
}
