import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "@/util/request-api";
import snakecaseKeys from "snakecase-keys";

export const useSubjectsStore = defineStore({
  id: "subjects",
  state: () => ({
    list: [],
    loading: false,
  }),
  actions: {
    async findAll(schoolId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/subjects`
      );
      this.list = camelcaseKeys(response.data);
      this.loading = false;
    },
    async create(subject) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${subject.schoolId}/subjects`,
        "POST",
        snakecaseKeys(subject)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async update(subject) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${subject.schoolId}/subjects/${subject.id}`,
        "PUT",
        snakecaseKeys(subject)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async save(subject) {
      return +subject.id > 0 ? this.update(subject) : this.create(subject);
    },
    async remove(subject) {
      this.loading = true;
      await request(
        `${config.baseUrl}/api/v1/schools/${subject.schoolId}/subjects/${subject.id}`,
        "DELETE",
        snakecaseKeys(subject)
      );
      this.loading = false;
    },
  },
});
