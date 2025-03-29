import { connect } from "../../../utils/connect";
import { ModalDialog } from "../../dialog-wrapper";
import { SelectFileForm } from "../../form/selectfile";
import { Link } from "../../link";

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
        }),
        linkClose: new Link({
          className: "link link_centered",
          linkText: "Закрыть",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                window.store.set({isDialogShow: false});
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
    isDialogShow: state.isDialogShow
  };
};

export default connect(mapStateToProps)(SelectFileDialog);
