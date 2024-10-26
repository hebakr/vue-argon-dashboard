import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";
import snakecaseKeys from "snakecase-keys";

export const buildCrudStore = (id) => {
  return defineStore({
    id: id,
    state: () => ({
      list: [],
      loading: false,
    }),
    actions: {
      async findAll(schoolId, page = 1, query = '') {
        this.loading = true;
        const response = await request(
          `${config.baseUrl}/api/v1/schools/${schoolId}/${id}?page=${page}&query=${query}`
        );
        this.list = camelcaseKeys(response.data, { deep: true });
        this.loading = false;
      },
      async create(model) {
        this.loading = true;
        const response = await request(
          `${config.baseUrl}/api/v1/schools/${model.schoolId}/${id}`,
          "POST",
          snakecaseKeys(model)
        );
        this.loading = false;
        return camelcaseKeys(response);
      },
      async update(model) {
        this.loading = true;
        const response = await request(
          `${config.baseUrl}/api/v1/schools/${model.schoolId}/${id}/${model.id}`,
          "PUT",
          snakecaseKeys(model)
        );
        this.loading = false;
        return camelcaseKeys(response);
      },
      async save(model) {
        return +model.id > 0 ? this.update(model) : this.create(model);
      },
      async remove(model) {
        this.loading = true;
        const response = await request(
          `${config.baseUrl}/api/v1/schools/${model.schoolId}/${id}/${model.id}`,
          "DELETE",
          snakecaseKeys(model)
        );
        this.loading = false;

        return response;
      },
    },
  });
};
