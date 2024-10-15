import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";
import { request } from "../util/request-api";

export const useBrandsStore = defineStore({
  id: "brands",
  state: () => ({
    brands: [],
    brand: null,
    loading: false,
  }),
  actions: {
    async fetchBrands() {
      this.loading = true;
      const response = await request(`${config.baseUrl}api/v1/brands`);
      this.brands = camelcaseKeys(response.data);
      this.loading = false;
    },
    async fetchBrand(id) {
      this.loading = true;
      const response = await request(`${config.baseUrl}api/v1/brands/${id}`);
      this.brand = camelcaseKeys(response.data);
      this.loading = false;
    },
  },
});
