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

      this.authApi.signup(userData)
      .then(() => {
        this.authApi.getUserInfo()
        .then((res) => {
          this.onAutorization(res);
        })
        .catch((err) => {
          window.store.set({signupError: JSON.parse(err.responseText)!.reason});
        });
      })
      .catch((err) => {
        window.store.set({signupError: JSON.parse(err.responseText)!.reason});
      })
    .catch((err) => {
      window.store.set({signupError: JSON.parse(err.responseText)!.reason});
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
  }

  signin(data : SignInData) {

    window.store.set({ isLoading: true });
      return this.authApi.signin(data)
      .then(() => {
        return this.getUserInfo()
        .then((res) => {
          this.onAutorization(res);
        })
        .catch((err) => {
          window.store.set({loginError: JSON.parse(err.responseText)!.reason});
        });
      })
      .catch((err) => {
        window.store.set({loginError: JSON.parse(err.responseText)!.reason});
      })
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

  getToken(chatId : number) {
    return this.authApi.getToken(chatId);
  }

  logout() {
    this.authApi.logout()
    .then(() => {
      window.router.go(pathes.LOGIN);
      window.store.set({currentUser: {}});
    })
    .catch(() => {
      window.router.go(pathes.SERVER_ERR);
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
