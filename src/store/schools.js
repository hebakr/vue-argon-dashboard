import { defineStore } from "pinia";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import config from "@/util/config";
import { request } from "@/util/request-api";

export const useSchoolsStore = defineStore({
  id: "schools",
  state: () => ({
    schools: [],
    currentSchool: null,
    activeYear: 0,
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
      this.activeYear = this.currentYear?.id;
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
    async isUserExist(email, schoolId, role, userId) {
      const response = await request(
        `${config.baseUrl}api/v1/schools/${schoolId}/find-user`,
        "POST",
        snakecaseKeys({ email, userId, role })
      );
      if (response.data) return true;

      return false;
    },

    setActiveYear(id) {
      this.activeYear = id;
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
                name: "parents",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.parents",
              icon: '<i class="fa fa-user text-primary text-lg opacity-8"></i>',
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
                name: "classes",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.classes",
              icon: '<i class="fa fa-chalkboard text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "class-rooms",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.classRooms",
              icon: '<i class="fa fa-door-open text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "time-tables",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.timeTables",
              icon: '<i class="fa fa-calendar text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "attendance",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.attendance",
              icon: '<i class="fa fa-calendar-check text-primary text-lg opacity-8"></i>',
            },
            {
              route: {
                name: "configurations",
                params: { schoolId: state.currentSchool?.id || 0 },
              },
              title: "nav.configurations",
              icon: '<i class="fa fa-cogs text-primary text-lg opacity-8"></i>',
            },
          ];
    },
    currentYear: (state) => {
      return (
        state.currentSchool?.academicYears.find((x) => x.current) ||
        state.currentSchool?.academicYears[0]
      );
    },
  },
});
