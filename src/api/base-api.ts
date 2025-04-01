import HTTPTransport from "../core/httptransport";
import apiProps from "../constants/api";

export default class BaseApi {

  static BASE_URL = apiProps.BASE_URL;
  serviceApi : HTTPTransport;

  constructor() {
    this.serviceApi = new HTTPTransport();
  }


  parseResponse(resPromise : Promise<any>) {

    return resPromise
      .then((res) => {
        if (res.status != 200) {
          return Promise.reject(res);
        }
        else {
          return res;
        }
      });
  }

}
