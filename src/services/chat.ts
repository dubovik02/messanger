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

  createChat(title : string = 'Новый чат') {
    this.chatApi.createChat(title)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.location = Pathnames.SERVER_ERR;
    })
  }

  addUsersToChat(users : number[], chatId : number) {
    this.chatApi.addUsersToChat(users, chatId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteUsersFromChat(users : number[], chatId : number) {
    this.chatApi.deleteUsersFromChat(users, chatId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
