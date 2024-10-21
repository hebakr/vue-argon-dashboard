import { defineStore } from "pinia";
import axios from "axios";
import config from "../util/config";
import { request } from "../util/request-api";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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
    async findTeacher(teacherId) {
      const response = await axios.get(
        `${config.baseUrl}invitations?teacherId=${teacherId}`
      );
      return camelcaseKeys(response.data);
    },

    async createTeacherAccount(data) {
      try {
        const response = await axios.post(
          `${config.baseUrl}invitations`,
          snakecaseKeys(data)
        );
        return camelcaseKeys(response.data);
      } catch (error) {
        console.log("ERROR", error.response.data.error);
        
        return { error: true, message: error.response.data.error };
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
