import { Button, Chats, ChatSet, ContextMenu, Link, MenuItem, PictureButton, SearchInput, TextLabel } from "../../components";
import dots from '../../assets/dots.png';
import trash from '../../assets/trash.png';
import { MessageForm } from "../../components/form/message";
import Page from "../page";
import Pathnames from "../../constants/pathnames";
import { connect } from "../../utils/connect";
import { Waiter } from "../../components/waiter";
import { PageProps } from "../../types/pageProps";
import apiPath from "../../constants/api";
import Block from "../../core/block";
import ChatService from "../../services/chat";
import { SearchUserDialog } from "../../components/dialog/searchuser";

type SelectChatPageProps = PageProps & {
  currentUser : Record<string, string>;
  emptyAvatar : string;
  isContextMenuShow: boolean;
  isDialogShow : boolean;
  activeChatUsers : Record<string, unknown>[];
  activeChatId: number
}

class SelectChatPage extends Page {

  constructor(props : SelectChatPageProps) {

    super(
      {
        ...props,
        className: 'chat__root-container',
      },
      //child
      {
        linkProfile: new Link({
          className: "link link_grey",
          linkText: "Профиль >",
          events: [
            {
              eventName: 'click',
              eventFunc: (e : Event) => {
                e.preventDefault();
                window.router.go(Pathnames.USER);
              }
            }
          ],
        }),

        avatar: new PictureButton({
          className: 'pictureButton pictureButton_cursor-default',
          pictureStyleClass: 'chat__user-image',
          imagePath: props.currentUser.avatar ? (apiPath.RESOURCES + props.currentUser.avatar) : props.emptyAvatar,
        }),

        searchInput: new SearchInput(),

        chatsList: ((new Chats(
          {
            className: 'chats-container',
            activeIndex: -1,
          }
        )) as unknown) as Block,

        chatsSet: ((new ChatSet(
          {
            className: 'chat__talk-container',
          }
        )) as unknown) as Block,

        searchUserDialog: ((new SearchUserDialog({}) as unknown) as Block),

        dotsButton: new PictureButton({
          className: 'pictureButton',
          pictureStyleClass: 'pictureButton__image',
          imagePath: dots,
          events: [
            {
              eventName: 'click',
              eventFunc: (e : MouseEvent) => {
                e.preventDefault();
                const show = (this.getProperties() as SelectChatPageProps)['isContextMenuShow'];
                if (!show) {
                  const childElems = this.getChildrens();
                  this.setChildrens({...childElems, contextMenu: this.createContextMenu()});
                  let target = this.element.getBoundingClientRect();
                  let elem = (this.getChildrens()['contextMenu'] as Block).element;
                  elem.style.right =  e.clientX - target.right + 48 + 'px';
                  elem.style.top = e.clientY + 64 - target.top + 'px';
                  window.store.set({isContextMenuShow : true});
                }
                else {
                  window.store.set({isContextMenuShow : false});
                }

              }
            }
          ]
        }),

        createChatBut: new Button({
          className: "button button_margin-null",
          attributes: [{name: "type", value: "button"}],
          buttonText: 'Создать чат',
          events: [
            {
              eventName: 'click',
              eventFunc: (e : MouseEvent) => {
                e.preventDefault();
                window.store.set({isContextMenuShow : false});
                window.store.set({isLoading : true});
                let result = prompt("Введите название чата", "Новый чат");
                if (result && result != '') {
                  const service = new ChatService();
                  service.createChat(result);
                }
                window.store.set({isLoading : false});
              }
            }
          ]
        }),

        contextMenu: new ContextMenu(
          {
            className: 'context-menu',
          },
          {
            menu: []
          }
        ),

        form: ((new MessageForm({
        }) as unknown) as Block),

        spinner: new Waiter()
      }

    );
  }

  override render(): string {

    const props = this.getProperties() as SelectChatPageProps;
    const avatarElem = this.getChildrens()['avatar'] as Block;
    const path = props.currentUser.avatar;
    const fullPath = path ? (apiPath.RESOURCES + path) : props.emptyAvatar;
    avatarElem.setProps({imagePath: fullPath});

    return `

        {{#if isContextMenuShow}}
          {{{ contextMenu }}}
        {{/if}}

        {{#if isDialogShow}}
          {{{ searchUserDialog }}}
        {{/if}}

        <div class="chat__list-container">
          {{{ linkProfile }}}
          {{{ createChatBut }}}
          {{{ searchInput }}}

          {{{ chatsList }}}

        </div>
        <div class="chat__props-container">

          {{#if isLoading}}
            {{{ spinner }}}
          {{/if}}

            <div class="chat__detail-container">
            {{#if activeChatId}}

              <div class="chat__user-container">
                  {{{ avatar }}}
                  <h3 class="chat__user-name">{{ currentUser.display_name }}</h3>
              </div>
              {{{ dotsButton }}}

            {{else}}
              {{> TextLabelHBS classStyle="textLabel textLabel_service-page-text" labelText='Веберете или создайте чат' }}
            {{/if}}
            </div>

            {{{ chatsSet }}}

          {{{ form }}}
        </div>
    `;
  }

  createContextMenu() {
    const chatUsers = (this.getProperties() as SelectChatPageProps)['activeChatUsers'];
    const childMenuItem = [];

    const addMenu = this.createAddUsersMenu();
    childMenuItem.push(addMenu);

    chatUsers.forEach( (item) => {
      const props = (this.getProperties() as SelectChatPageProps);
      if (item.id != props.currentUser.id) {
        const userElem = new MenuItem({
          className: 'menu-item',
          menuText: (item.login as string),
          buttonImage: trash,
          onButtonClick: () => {
            const service = new ChatService();
            service.deleteUsersFromChat([item.id as number], props.activeChatId).
            then(() => {
              (userElem.element as HTMLElement).innerText = '';
            })
            .catch(() => {
              window.router.go(Pathnames.SERVER_ERR);
            });
          }
        })
        childMenuItem.push(userElem);
      }
    })

    return new ContextMenu(
      {
        className: 'context-menu',
      },
      {
        menu: childMenuItem,
      }
    );
  }

  createAddUsersMenu() {
    return new TextLabel(
      {
        className: 'context-menu__item context-menu__link',
        labelText: 'Добавить пользователя в чат',
        events: [
          {
            eventName: 'click',
            eventFunc: (e : MouseEvent) => {
              e.preventDefault();
              const childElems = this.getChildrens();
              this.setChildrens({...childElems, searchUserDialog: ((new SearchUserDialog({}) as unknown) as Block)});
              window.store.set({isContextMenuShow : false});
              window.store.set({isDialogShow : true});
            }
          }
        ]
      }
    )
  }

}

const mapStateToProps = (state : Record<string, unknown>) => {
  return {
    isLoading: state.isLoading,
    currentUser: state.currentUser,
    emptyAvatar: state.emptyAvatar,
    isContextMenuShow: state.isContextMenuShow,
    isDialogShow: state.isDialogShow,
    activeChatUsers : state.activeChatUsers,
    activeChatId: state.activeChatId
  };
};

export default connect(mapStateToProps)(SelectChatPage);
