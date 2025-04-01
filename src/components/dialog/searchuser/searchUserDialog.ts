import Block from "../../../core/block";
import { connect } from "../../../utils/connect";
import { ModalDialog } from "../../dialog-wrapper";
import { SearchUserForm } from "../../form/searchuser";
import { Link } from "../../link";

class SearchUserDialog extends ModalDialog {

  constructor() {

    super(
      {
        className: 'dialog dialog_modal',
      },
      {

        form: ((new SearchUserForm({}) as unknown) as Block),

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
    );
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
    isDialogShow: state.isDialogShow,
  };
};

export default connect(mapStateToProps)(SearchUserDialog);
