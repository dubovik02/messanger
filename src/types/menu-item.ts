import { BlockProps } from "./blockProps";

export type MenuItemProps = BlockProps & {
  menuText: string;
  onMenuClick?: Function;
  buttonImage?: string;
  onButtonClick?: Function
}
