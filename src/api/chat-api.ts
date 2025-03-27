import BaseApi from "./base-api";
import apiProps from "../constants/api";

export default class ChatApi extends BaseApi {

  constructor() {
    super();
  }

  getChats(filter : string = '') {
    return this.parseResponse(
      this.serviceApi.get(
        BaseApi.BASE_URL + apiProps.CHATS_GET,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            offset: 10,
            limit: 30,
            title: filter
          })
        }
      )
    )
  }

  getChatUsers(chatId : number) {
    return this.parseResponse(
      this.serviceApi.get(
        BaseApi.BASE_URL + `/chats/${chatId}/users` ,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
        }
      )
    )
  }

  createChat(title : string) {
    return this.parseResponse(
        this.serviceApi.post(
        BaseApi.BASE_URL + apiProps.CHATS_CREATE,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            title: title
          })
        }
      )
    );
  }

  addUsersToChat(users : number[], chatId : number) {
    return this.parseResponse(
        this.serviceApi.put(
        BaseApi.BASE_URL + apiProps.CHATS_ADD_USERS,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            users: users,
            chatId: chatId
          })
        }
      )
    );
  }

  deleteUsersFromChat(users : number[], chatId : number) {
    return this.parseResponse(
        this.serviceApi.delete(
        BaseApi.BASE_URL + apiProps.CHATS_DELETE_USERS,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            users: users,
            chatId: chatId
          })
        }
      )
    );
  }

}
