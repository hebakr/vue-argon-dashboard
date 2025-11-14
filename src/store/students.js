import { buildCrudStore } from "./store-builder";
import { request } from "../util/request-api";
import config from "../util/config";

export const useStudentsStore = buildCrudStore("students", {
  async enrollStudent(schoolId, studentId, gradeId, classId, academicYearId) {
    await request(
      `${config.baseUrl}/api/v1/schools/${schoolId}/students/${studentId}/enroll`,
      "POST",
      {
        grade_id: gradeId,
        academic_class_id: classId,
        academic_year_id: academicYearId,
        student_id: studentId,
        school_id: schoolId,
      }
    );
  },
});
