import AuthApi from "../api/auth-api";
import { SignInData } from "../types/sighinData";
import { User } from "../types/user";
import pathes from "../constants/pathnames";
import ChatService from "./chat";


export default class AuthService {

  private authApi : AuthApi;

  constructor() {
    this.authApi = new AuthApi();
  }

  signup(userData : User) {

    window.store.set({ isLoading: true });

    //this.logout()
    //.then(() => {
      this.authApi.signup(userData)
      .then(() => {
        this.authApi.getUserInfo()
        .then((res) => {
          //window.router.go(pathes.CHAT);
          // window.store.set({currentUser : JSON.parse(res.responseText)});
          // window.router.go(pathes.CHAT);
          this.onAutorization(res);
        })
        .catch((err) => {
          window.store.set({signupError: JSON.parse(err.responseText)!.reason});
        });
      })
      .catch((err) => {
        window.store.set({signupError: JSON.parse(err.responseText)!.reason});
      })
     //})
    .catch((err) => {
      window.store.set({signupError: JSON.parse(err.responseText)!.reason});
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
  }

  signin(data : SignInData) {

    window.store.set({ isLoading: true });

    //this.logout()
    //.then(() => {
      return this.authApi.signin(data)
      .then(() => {
        return this.getUserInfo()
        .then((res) => {
          // window.store.set({currentUser : JSON.parse(res.responseText)});
          // window.router.go(pathes.CHAT);
          this.onAutorization(res);
        })
        .catch((err) => {
          window.store.set({loginError: JSON.parse(err.responseText)!.reason});
        });
      })
      .catch((err) => {
        window.store.set({loginError: JSON.parse(err.responseText)!.reason});
      })
    //})
    .catch((err) => {
      window.store.set({loginError: JSON.parse(err.responseText)!.reason});
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    })
  }

  getUserInfo() {
    return this.authApi.getUserInfo();
  }

  logout() {
    this.authApi.logout()
    .then(() => {
      window.router.go(pathes.LOGIN);
      window.store.set({currentUser: {}});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onAutorization(authParams : Record<string, string>) {
    window.store.set({currentUser : JSON.parse(authParams.responseText)});

    const service = new ChatService();
    service.getCurrentUsersChats()
    .then((res) => {
      let str = res.responseText;
      str = str.replace(/\\/g, '');
      const data = JSON.parse(str);
      window.store.set({userChats : data});
    })
    .catch((err) => {
      window.store.set({loginError: JSON.parse(err.responseText)!.reason});
    })
    .finally(() => {

    });

    window.router.go(pathes.CHAT);
  }
}
