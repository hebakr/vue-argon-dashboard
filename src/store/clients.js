import { defineStore } from "pinia";
import axios from "axios";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";
import { request } from "../util/request-api";

export const useClientsStore = defineStore({
  id: "clients",
  state: () => ({
    clients: [],
    currentClient: null,
    loading: false,
  }),
  actions: {
    async fetchClients() {
      const response = await request(`${config.baseUrl}api/v1/clients`);
      this.clients = camelcaseKeys(response.data);
    },
    async findById(id) {
      this.loading = true;
      const response = await axios.get(`${config.baseUrl}api/v1/clients/${id}`);
      this.currentClient = response.data;
      this.loading = false;
    },
    async create(data) {
      await axios.post(`${config.baseUrl}api/v1/clients`, data);
      await this.fetchClients();
    },
    async update(id, data) {
      await axios.put(`${config.baseUrl}api/v1/clients/${id}`, data);
      await this.fetchClients();
    },
    async deleteClient(id) {
      await axios.delete(`${config.baseUrl}api/v1/clients/${id}`);
      await this.fetchClients();
    },
  },
});
