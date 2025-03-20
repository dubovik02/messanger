import { BlockProps } from "./blockProps";

export type PageProps = BlockProps & {
  pageParams?: object;
}
