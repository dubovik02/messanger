import BaseApi from "./base-api";
import apiProps from "../constants/api";
import { User } from "../types/user";
import { SignInData } from "../types/sighinData";

export default class AuthApi extends BaseApi {

  constructor() {
    super();
  }

  signup(user : User) {
    return this.parseResponse(
        this.serviceApi.post(
        BaseApi.BASE_URL + apiProps.AUTH_SIGNUP,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(user)
        }
      )
    );
  }

  signin(data : SignInData) {
    return this.parseResponse(
        this.serviceApi.post(
        BaseApi.BASE_URL + apiProps.AUTH_SIGNIN,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(data)
        }
      )
    );
  }

  getUserInfo() {
    return this.parseResponse(
      this.serviceApi.get(
        BaseApi.BASE_URL + apiProps.AUTH_USERINFO,
        {
          credentials: 'include',
          mode: 'cors',
          data: {}
        }
      )
    );
  }

  logout() {
    return this.parseResponse(
      this.serviceApi.post(
        BaseApi.BASE_URL + apiProps.AUTH_LOGOUT,
        {
          credentials: 'include',
          mode: 'cors',
          data: {}
        }
      )
    );
  }
}
