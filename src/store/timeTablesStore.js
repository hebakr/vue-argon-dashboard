import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";
// import snakecaseKeys from "snakecase-keys";

export const useTimeTablesStore = defineStore({
  id: "timeTables",
  state: () => ({
    loading: false,
    data: [],
  }),
  getters: {
    count() {
      return this.data.length;
    },
    timeTable() {
      const days = [...new Set(this.data.map((slot) => slot.dayOfWeek))];

      return days.map((day) => {
        return {
          day,
          slots: this.data.filter((slot) => slot.dayOfWeek === day),
        };
      });
    },
  },
  actions: {
    async fetchTimeTable(schoolId, classId, academicYearId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/time_tables?academic_class_id=${classId}&academic_year_id=${academicYearId}`,
        "GET"
      );
      this.loading = false;
      this.data = camelcaseKeys(response.data, { deep: true });
      return this.data;
    },
    async assignTeacherAndSubject(schoolId, timeSlot, subjectId, teacherId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/time_tables`,
        "POST",
        {
          time_table_id: timeSlot.timeTableId,
          slot_id: timeSlot.id,
          subject_id: subjectId,
          teacher_id: teacherId,
        }
      );
      this.loading = false;
      return camelcaseKeys(response);
    },
  },
});
