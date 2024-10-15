import { defineStore } from "pinia";
import axios from "axios";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
  }),
  actions: {
    async fetchUsers(brandId) {
      this.loading = true;
      const response = await axios.get(
        `${config.baseUrl}api/v1/brands/${brandId}/users`
      );
      this.users = camelcaseKeys(response.data);
      this.loading = false;
    },
    async create(brandId, data) {
      await axios.post(
        `${config.baseUrl}api/v1/brands/${brandId}/users/`,
        data
      );
      await this.fetchUsers(brandId);
    },
  },
});
