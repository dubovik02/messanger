import { BlockProps } from "./blockProps";
import { User } from "./user";

export type ChatCardProps = BlockProps & {
  id: number;
  title: string;
  avatar: string;
  unread_count: number,
  created_by: number,
  last_message:
  {
    user: User;
    time: string,
    content: string
  }
}
