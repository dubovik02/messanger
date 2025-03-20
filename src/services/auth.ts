import AuthApi from "../api/auth-api";
import { SignInData } from "../types/sighinData";
import { User } from "../types/user";
import pathes from "../constants/pathnames";


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
          window.router.go(pathes.CHAT);
          window.store.set({currentUser : JSON.parse(res.responseText)});
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
      this.authApi.signin(data)
      .then(() => {
        this.getUserInfo()
        .then((res) => {
          window.router.go(pathes.CHAT);
          window.store.set({currentUser : JSON.parse(res.responseText)});
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
    return this.authApi.logout();
  }
}
