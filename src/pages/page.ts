import Block from "../core/block";
import { PageProps } from "../types/pageProps";

export default class Page extends Block {

//constructor( props: PageProps, childrens: Record<string, Block | Block[]>  = {}) {
constructor( props: PageProps, childrens: Record<string, Block | Block[]>) {
    super(
      'div',
      props,
      childrens
    );
  }
}
