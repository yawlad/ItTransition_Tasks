import UserType from "@/types/UserType";
import { observable, action, makeObservable } from "mobx";

class AuthStore {
  isAuthenticated: Boolean = false;
  user: UserType | null = null;

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      user: observable,
      login: action,
      logout: action,
    });
  }

  login(user: UserType) {
    this.isAuthenticated = true;
    this.user = user;
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
  }
}

const authStore = new AuthStore();

export default authStore;
