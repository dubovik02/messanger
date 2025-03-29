import pathes from '../constants/api';
export default class WebSocketApi {

  static connect(chatId : number, userId : number, token: string, getMsgFunction?: Function ) {
    return new Promise((resolve, reject) => {
      const server = new WebSocket( pathes.WS_BASE_URL + `/${userId}/${chatId}/${token}`);
      server.onmessage = (event) => {
        getMsgFunction?.call(this, event.data);
      }
      server.onopen = () => {
        resolve(server);
      };
      server.onerror = (err) => {
        reject(err);
      };
    });
  }
}
