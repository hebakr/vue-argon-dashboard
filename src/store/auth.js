import { defineStore } from "pinia";
import axios from "axios";
import config from "../util/config";
import { request } from "../util/request-api";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    accessToken: "",
    board: null,
  }),
  actions: {
    async login(email, password) {
      try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");

        const response = await axios.post(`${config.baseUrl}users/sign_in`, {
          user: {
            email,
            password,
          },
        });
        if (response.status === 200) {
          this.accessToken = response.headers?.authorization;
          localStorage.setItem("authToken", response.headers?.authorization);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(response.data?.user)
          );
          // setAuthorizationHeader(response.headers?.authorization);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    async signout() {
      try {
        // setAuthorizationHeader();
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        this.accessToken = null;
        await request(`${config.baseUrl}users/sign_out`, "DELETE");
      } catch (ex) {
        console.log(ex.code);
      }
    },

    updateBoard(board) {
      this.board = board;
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken || !!localStorage.authToken,
    token: () => localStorage.authToken,
    currentUser: () => JSON.parse(localStorage.currentUser),
  },
});
