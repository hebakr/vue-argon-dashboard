import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";
import { request } from "../util/request-api";

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
  },

  getters: {
    schoolRoutes: (state) => {
      const isRTL = false;
      return state.currentSchool == null
        ? []
        : [
            {
              route: {
                name: "dashboard",
                params: { schoolId: state.currentSchool.id },
              },
              title: isRTL.value ? "لوحة القيادة" : "Dashboard",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
            {
              route: {
                name: "students",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: isRTL.value ? "غرف الفصول" : "Students",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
            {
              route: {
                name: "teachers",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: isRTL.value ? "غرف الفصول" : "Teachers",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
            {
              route: {
                name: "grades",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: isRTL.value ? "غرف الفصول" : "Grades",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
            {
              route: {
                name: "subjects",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: isRTL.value ? "المواد الدراسية" : "Subjects",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
            {
              route: {
                name: "class-rooms",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: isRTL.value ? "غرف الفصول" : "Class Rooms",
              icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
            },
          ];
    },
  },
});
