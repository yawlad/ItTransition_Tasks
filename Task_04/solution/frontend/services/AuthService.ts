import { instance } from "./api.config";

const AuthService = {
  register(userData: any) {
    return instance.post("/auth/register/", userData);
  },

  login(userData: any) {
    return instance.post("/auth/login/", userData);
  },

  logout() {
    return instance.post("/auth/logout/");
  },
};

export default AuthService;
