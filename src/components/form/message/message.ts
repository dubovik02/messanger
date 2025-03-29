import { FormProps } from "../../../types/formProps";
import ArrowButton from "../../arrowButton/arrowButton";
import { FormWrapper } from "../../form-wrapper";
import arrowRight from '../../../assets/arrowR.png';
import { MsgInput } from "../../msgInput";
import { PictureButton } from "../../pictureButton";
import clip from '../../../assets/clip.png';
import { connect } from "../../../utils/connect";
import WebSocketApi from "../../../api/ws-api";
import Block from "../../../core/block";
import { ChatSetProps } from "../../../types/chatSetProps";
import pathnames from "../../../constants/pathnames";

type MessageFormProps = FormProps & {
  token: string;
  activeChatId : number;
  currentUser: Record<string, unknown>;
  activeChatIncomeMsg: ChatSetProps[];
}

class MessageForm extends FormWrapper {

  constructor(props : MessageFormProps) {
    super(
      {
        ...props,
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
                const curProps = this.getProperties() as MessageFormProps;
                if (curProps.token && curProps.activeChatId && curProps.currentUser.id) {
                  WebSocketApi.connect(curProps.activeChatId, curProps.currentUser.id as number, curProps.token, this.makeIncomeMessage)
                  .then((res) => {
                    const data = {content : curProps.formState!.message, type: "message"};
                    (res as WebSocket).send(JSON.stringify(data));
                    this.setProps({formState: {message : ''}});
                  })
                  .catch(() => {
                    window.router.go(pathnames.SERVER_ERR);
                  })
                }
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
              {
                name: 'value',
                value: ''
              }
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

    (this.getChildrens()['messageInput'] as Block).element.value
    = (this.getProperties() as MessageFormProps).formState!.message;

    return `
      {{{ clipButton }}}
      {{{ messageInput }}}
      {{{ buttonSend }}}
    `;
  }

  override checkValidityBeforeSubmit(): boolean {
    return this.checkMessage();
  }

  makeIncomeMessage = (data : string) => {
    const props = this.getProperties() as MessageFormProps;
    let incomeMsg = [...props.activeChatIncomeMsg];
    const msg = JSON.parse(data);
    if (Array.isArray(msg)) {
      if (msg.length) {
        incomeMsg = incomeMsg.concat(msg);
      }
    }
    else {
      msg['chat_id'] = props.activeChatId;
      incomeMsg.push(msg);
      incomeMsg = incomeMsg.reverse();
    }
    window.store.set({ activeChatIncomeMsg : incomeMsg });
  }
}

const mapStateToProps = (state : Record<string, unknown> ) => {
  return {
    isLoading: state.isLoading,
    token: state.token,
    activeChatId : state.activeChatId,
    currentUser : state.currentUser,
    activeChatIncomeMsg: state.activeChatIncomeMsg
  };
};

export default connect(mapStateToProps)(MessageForm);
