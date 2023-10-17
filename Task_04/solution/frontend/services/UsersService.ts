import { instance } from "./api.config";

const UsersService = {
  getUsers() {
    return instance.get("/users/");
  },

  getMe() {
    return instance.get("/users/me/");
  },

  deleteUser(id: string) {
    return instance.delete(`/users/delete/${id}/`);
  },

  blockUser(id: string) {
    return instance.put(`/users/block/${id}/`, {"new_is_blocked": 1});
  },
  unblockUser(id: string) {
    return instance.put(`/users/block/${id}/`, {"new_is_blocked": 0});
  },
};

export default UsersService;
