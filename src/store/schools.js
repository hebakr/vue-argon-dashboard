import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";
import { request } from "../util/request-api";
import snakecaseKeys from "snakecase-keys";

export const useSchoolsStore = defineStore({
  id: "schools",
  state: () => ({
    schools: [],
    currentSchool: null,
    loading: false,
  }),
  actions: {
    async fetchSchools(brandId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}api/v1/brands/${brandId}/schools`
      );

      this.schools = camelcaseKeys(response.data);
      this.loading = false;
    },
    async findById(id) {
      this.loading = true;
      const response = await request(`${config.baseUrl}api/v1/schools/${id}`);

      this.currentSchool = camelcaseKeys(response.data);
      this.loading = false;
    },
    async create(brandId, data) {
      await request(
        `${config.baseUrl}api/v1/brands/${brandId}/schools/`,
        "POST",
        data
      );
      await this.fetchSchools(brandId);
    },
    async update(data) {
      await request(
        `${config.baseUrl}api/v1/brands/${data.brand_id}/schools/${data.id}`,
        "PUT",
        data
      );
      await this.fetchSchools(data.brand_id);
    },
    async deleteSchool(id, brandId) {
      await request(
        `${config.baseUrl}api/v1/brands/${brandId}/schools/${id}`,
        "DELETE"
      );
      await this.fetchSchools(brandId);
    },
    async isUserExist(email, schoolId, teacherId) {
      const response = await request(
        `${config.baseUrl}api/v1/schools/${schoolId}/find-user`,
        "POST",
        snakecaseKeys({ email, teacherId })
      );
      if (response.data) return true;

      return false;
    },
  },

  getters: {
    schoolRoutes: (state) => {
      return state.currentSchool == null
        ? []
        : [
            {
              route: {
                name: "dashboard",
                params: { schoolId: state.currentSchool.id },
              },
              title: "nav.dashboard",
              icon: '<i class="fa fa-qrcode text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "students",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.students",
              icon: '<i class="fa fa-users text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "teachers",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.teachers",
              icon: '<i class="fa fa-user-graduate text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "grades",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.grades",
              icon: '<i class="fa fa-list-ul text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "subjects",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.subjects",
              icon: '<i class="fa fa-book-open text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "class-rooms",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.classRooms",
              icon: '<i class="fa fa-building text-primary text-lg opacity-8"></i>',
            },
          ];
    },
  },
});
