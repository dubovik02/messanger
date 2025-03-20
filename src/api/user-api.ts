import { User } from "../types/user";
import BaseApi from "./base-api";
import apiProps from "../constants/api";

export default class UserApi extends BaseApi {

  constructor() {
    super();
  }

  changeUserProfile(newUserData : User) {
    return this.parseResponse(
        this.serviceApi.put(
        BaseApi.BASE_URL + apiProps.USER_PROFILE,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            newUserData
          })
        }
      )
    );
  }

  changeUserAvatar(data : FormData) {
    return this.parseResponse(
        this.serviceApi.put(
        BaseApi.BASE_URL + apiProps.USER_AVATAR,
        {
          credentials: 'include',
          mode: 'cors',
          data: data
        }
      )
    );
  }

  changeUserPassword(oldPass : string, newPass : string) {
    return this.parseResponse(
        this.serviceApi.put(
        BaseApi.BASE_URL + apiProps.USER_PROFILE,
        {
          credentials: 'include',
          mode: 'cors',
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            oldPassword : oldPass,
            newPassword : newPass
          })
        }
      )
    );
  }

}
