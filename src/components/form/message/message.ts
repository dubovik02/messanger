import { FormProps } from "../../../types/formProps";
import ArrowButton from "../../arrowButton/arrowButton";
import { FormWrapper } from "../../form-wrapper";
import arrowRight from '../../../assets/arrowR.png';
import { MsgInput } from "../../msgInput";
import { PictureButton } from "../../pictureButton";
import clip from '../../../assets/clip.png';
import { connect } from "../../../utils/connect";
import { Waiter } from "../../waiter";
import UserService from "../../../services/user";
import ChatService from "../../../services/chat";

class MessageForm extends FormWrapper {

  constructor() {
    super(
      {
        className: 'chat__msg-container',
          formState: {
            message: '',
          },
          events: [
            {
              eventName: 'submit',
              eventFunc: (e : Event) => {
                e.preventDefault();
                const result = this.checkValidityBeforeSubmit();
                if (result) {

                }
              }
            }
          ],
      },
      {
        clipButton: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image',
          imagePath: clip,
        }),

        messageInput: new MsgInput(
          {
            className: 'msgInput',
            attributes: [
              {
                name: 'type',
                value: 'text',
              },
              {
                name: 'name',
                value: 'message',
              },
              {
                name: 'placeholder',
                value: 'Сообщение',
              },
            ],
            events: [
              {
                eventName: 'blur',
                eventFunc: (e : Event) => {
                  e.preventDefault();
                  this.checkMessage();
                }
              }
            ]
          }
        ),

        buttonSend: new ArrowButton({
          className: 'arrowButton',
          imagePath: arrowRight,
          attributes: [
            {name: "type", value: "submit"}
          ],
        }),
      }
    );
  }

  override render(): string {
    return `
      {{{ clipButton }}}
      {{{ messageInput }}}
      {{{ buttonSend }}}
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    return this.checkMessage();
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(MessageForm);
