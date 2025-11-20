import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";
import snakecaseKeys from "snakecase-keys";

export const useAttendanceStore = defineStore({
  id: "attendance",
  state: () => ({
    loading: false,
  }),
  actions: {
    async fetchClassAttendance(
      schoolId,
      classId,
      date,
      academicYearId
    ) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/attendances?academic_class_id=${classId}&date=${date}&academic_year_id=${academicYearId}`,
        "GET"
      );
      this.loading = false;
      return camelcaseKeys(response.data, { deep: true });
    },
    async recordClassAttendance(
      schoolId,
      classId,
      date,
      academicYearId,
      attendanceData
    ) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/attendances`,
        "POST",
        snakecaseKeys(
          {
            academicClassId: classId,
            date,
            academicYearId,
            attendanceData,
          },
          { deep: true }
        )
      );
      this.loading = false;
      return camelcaseKeys(response);
    },
  },
});
