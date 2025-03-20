import ChatApi from "../api/chat-api";
import Pathnames from "../constants/pathnames";

export default class ChatService {

  private chatApi : ChatApi;

  constructor() {
    this.chatApi = new ChatApi();
  }

  getCurrentUsersChats(filter : string = '') {
    this.chatApi.getChats(filter)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.location = Pathnames.SERVER_ERR;
    })
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
      //document.location = Pathnames.SERVER_ERR;
    })
  }

  deleteUsersFromChat(users : number[], chatId : number) {
    this.chatApi.deleteUsersFromChat(users, chatId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      //document.location = Pathnames.SERVER_ERR;
    })
  }
}
