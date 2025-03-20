import UserApi from "../api/user-api";
import Pathnames from "../constants/pathnames";
import { User } from "../types/user";

export default class UserService {

  private userApi : UserApi;

  constructor() {
    this.userApi = new UserApi();
  }

  changeUserProfile(newUserData : User) {
    this.userApi.changeUserProfile(newUserData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.location = Pathnames.SERVER_ERR;
    })
  }

  changeUserAvatar(data : FormData) {
    this.userApi.changeUserAvatar(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.location = Pathnames.SERVER_ERR;
    })
  }

  changeUserPassword(oldPass : string, newPass : string) {
    this.userApi.changeUserPassword(oldPass, newPass)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      document.location = Pathnames.SERVER_ERR;
    })
  }

}
