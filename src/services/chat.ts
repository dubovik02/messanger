import ChatApi from "../api/chat-api";
import Pathnames from "../constants/pathnames";

export default class ChatService {

  private chatApi : ChatApi;

  constructor() {
    this.chatApi = new ChatApi();
  }

  getCurrentUsersChats(filter : string = '') {
    return this.chatApi.getChats(filter);
  }

  getChatUsers(chatId : number) {
    return this.chatApi.getChatUsers(chatId);
  }

  createChat(title : string = 'Новый чат') {
    this.chatApi.createChat(title)
    .then(() => {
      this.getCurrentUsersChats()
      .then((res) => {
        let str = res.responseText;
        str = str.replace(/\\/g, '');
        const data = JSON.parse(str);
        window.store.set({userChats : data});
      })
      .catch(() => {
        window.router.go(Pathnames.SERVER_ERR);
      })
    })
    .catch(() => {
      window.router.go(Pathnames.SERVER_ERR);
    })
    .finally(() => {
      window.store.set({isLoading : false});
    });
  }

  addUsersToChat(users : number[], chatId : number) {
    return this.chatApi.addUsersToChat(users, chatId);
  }

  deleteUsersFromChat(users : number[], chatId : number) {
    return this.chatApi.deleteUsersFromChat(users, chatId);
  }
}
