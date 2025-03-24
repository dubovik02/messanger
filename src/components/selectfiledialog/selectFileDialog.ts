import { connect } from "../../utils/connect";
import { Button } from "../button";
import { ModalDialog } from "../dialog";
import { SelectFileForm } from "../form/selectfile";
import { Link } from "../link";

class SelectFileDialog extends ModalDialog {

  constructor() {
    super(
      {
        className: 'dialog dialog_modal',
      },
      {
        form: new SelectFileForm({
          className: 'dialog__form',
          formState: {
            avatar: ''
          },
          blockData: {
            exit: () => { this.hide()}
          }
        }),
        linkClose: new Link({
          className: "link link_centered",
          linkText: "Закрыть",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                this.hide();
              }
            }
          ],
        }),
      }
    )
  }

  override render(): string {

    return `
      {{{ form }}}
      {{{ linkClose }}}
    `;
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    currentUser: state.currentUser,
    showDialog: state.showDialog
  };
};

export default connect(mapStateToProps)(SelectFileDialog);
