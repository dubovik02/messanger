import { Link } from "../../components";
import Page from "../page";
import Pathnames from "../../constants/pathnames";

export default class ServicePage extends Page {

  constructor() {
    super(
      {
        className : 'service-page',
      },
      //pageProps,
      {
        linkBack: new Link({
          className: "link",
          linkText: "Назад к чатам",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                document.location.pathname = Pathnames.CHAT;
              }
            }
          ],
        }),
      }
    );
  }
}
