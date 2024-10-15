import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";
import snakecaseKeys from "snakecase-keys";

export const useGradesStore = defineStore({
  id: "grades",
  state: () => ({
    list: [],
    loading: false,
  }),
  actions: {
    async findAll(schoolId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/grades`
      );
      this.list = camelcaseKeys(response.data);
      this.loading = false;
    },
    async create(grade) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${grade.schoolId}/grades`,
        "POST",
        snakecaseKeys(grade)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async update(grade) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${grade.schoolId}/grades/${grade.id}`,
        "PUT",
        snakecaseKeys(grade)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async save(grade) {
      return +grade.id > 0 ? this.update(grade) : this.create(grade);
    },
    async remove(grade) {
      this.loading = true;
      await request(
        `${config.baseUrl}/api/v1/schools/${grade.schoolId}/grades/${grade.id}`,
        "DELETE",
        snakecaseKeys(grade)
      );
      this.loading = false;
    },
  },
});
