import Block from "../core/block";
import Page from "../pages/page";
import { PageProps } from "./pageProps";

export type RouteProps = {
  pathname: string;
  //pageClass: typeof Page;
  pageClass: any;
  page: Block | null;
}
