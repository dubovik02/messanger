import UserApi from "../api/user-api";
import Pathnames from "../constants/pathnames";
import { User } from "../types/user";

export default class UserService {

  private userApi : UserApi;

  constructor() {
    this.userApi = new UserApi();
  }

  changeUserProfile(newUserData : User) {

    window.store.set({isLoading : true});

    this.userApi.changeUserProfile(newUserData)
    .then((res) => {
      window.router.go(Pathnames.USER);
      window.store.set({currentUser : JSON.parse(res.responseText)});
    })
    .catch(() => {
      window.router.go(Pathnames.SERVER_ERR);
    })
    .finally(() => {
      window.store.set({isLoading : false});
    });
  }

  changeUserAvatar(data : FormData, exitFunc : Function | null) {
    window.store.set({isLoading : true});

    this.userApi.changeUserAvatar(data)
    .then((res) => {
      window.store.set({currentUser : JSON.parse(res.responseText)});
    })
    .catch(() => {
      window.router.go(Pathnames.SERVER_ERR);
    })
    .finally(() => {
      window.store.set({isLoading : false});
      if (exitFunc instanceof Function) {
        exitFunc.call(this);
      }
    });
  }

  changeUserPassword(data : object) {
    window.store.set({isLoading : true});
    this.userApi.changeUserPassword(data)
    .then(() => {
      window.router.go(Pathnames.USER);
    })
    .catch(() => {
      window.router.go(Pathnames.SERVER_ERR);
    })
    .finally(() => {
      window.store.set({isLoading : false});
    });
  }

}
