import { RouteProps } from "../types/routeProps";

export default class Route {

  private props : RouteProps;

  constructor(props : RouteProps) {
    this.props = props;
  }

  leave() {
    if (this.props.page) {
    }
  }

  match(pathname : string) {
    return this.isEqual(pathname, this.props.pathname);
  }

  isEqual(lhs : string, rhs : string) {
    return lhs === rhs;
  }

  render(rootQuery : string) {
    if (!this.props.page) {
      this.props.page = new this.props.pageClass({}, {});
    }
    const root = document.querySelector(rootQuery);
    if (root) {
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.insertAdjacentElement('beforeend', this.props.page!.getContent());
      this.props.page!.componentDidMount();
    }
  }
}
