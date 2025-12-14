
<script setup>
import PageLayout from "@/components/PageLayout.vue";
import AppSelect from "@/components/AppSelect.vue";
import { onMounted, ref, computed } from "vue";
import { useClassesStore } from "@/store/classes";
import { useSchoolsStore } from "@/store/schools";
import { useRoute } from "vue-router";
import { useAttendanceStore } from "@/store/attendanceStore";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const schoolsStore = useSchoolsStore();
const attendanceStore = useAttendanceStore();
const { params } = useRoute();
const store = useClassesStore();
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const toast = useToast();
const formData = ref({
  academicClassId: "",
  attendanceDate: `${year}-${month}-${day}`,
});

const attendanceItems = ref([]);

const classOptions = computed(() =>
  store.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const loading = computed(() => store.loading);
onMounted(() => {
  store.findAll(params.schoolId);
});

const handleChange = async () => {
  const data = await attendanceStore.fetchClassAttendance(
    params.schoolId,
    formData.value.academicClassId,
    formData.value.attendanceDate,
    schoolsStore.currentYear?.id || 0
  );

  attendanceItems.value = data.records;
};

const handleToggleAll = (event) => {
  const isChecked = event.target.checked;
  attendanceItems.value.forEach((item) => {
    item.present = isChecked;
  });
};

const submitAttendance = async () => {
  const attendanceData = attendanceItems.value.map((item) => {
    return {
      enrollmentId: item.enrollmentId,
      studentId: item.studentId,
      present: item.present,
    };
  });

  const response = await attendanceStore.recordClassAttendance(
    params.schoolId,
    formData.value.academicClassId,
    formData.value.attendanceDate,
    schoolsStore.currentYear?.id || 0,
    attendanceData
  );

  if (response.error == null) {
    toast.success("Attendance recorded successfully!");
  } else {
    toast.error(`Error: ${response.error}`);
  }
};
</script>
<template>
  <page-layout title="Attendance">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <app-select
            id="classsId"
            name="classsId"
            v-model="formData.academicClassId"
            @onChange="handleChange"
            :options="classOptions"
            prompt="Select Class"
          ></app-select>
        </div>
        <div
          class="col-12 col-md-6"
          v-if="authStore.isSuperAdmin || authStore.isAdmin"
        >
          <!-- Additional filters or controls can go here -->
          <argon-input
            id="attendanceDate"
            name="attendanceDate"
            v-model="formData.attendanceDate"
            type="date"
            :disabled="!authStore.isSuperAdmin && !authStore.isAdmin"
          ></argon-input>
        </div>
      </div>
    </div>
    <hr />

    <div class="container">
      <div class="loading-data d-flex justify-content-center" v-if="loading">
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="attendanceItems.length > 0">
        <div class="table-responsive p-0">
          <table class="table">
            <thead>
              <tr>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  Roll No
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  Student Name
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 w-10"
                >
                  <!-- <input type="checkbox" checked @change="handleToggleAll" /> -->
                  <argon-switch checked @change="handleToggleAll">
                    Present
                  </argon-switch>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in attendanceItems" :key="item.enrollmentId">
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  ST-{{ item.enrollmentId }}
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <div class="d-flex px-2 py-1">
                    <div>
                      <img
                        src="@/assets/img/team-1.jpg"
                        class="avatar avatar-sm me-3"
                        alt="user1"
                        v-if="item.student.gender === 'male'"
                      />
                      <img
                        src="@/assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                        alt="user1"
                        v-if="item.student.gender === 'female'"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">
                        {{ item.student.fullName }}
                      </h6>
                      <p class="text-xs text-secondary mb-0"></p>
                    </div>
                  </div>
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <!-- <input type="checkbox" v-model="item.present" /> -->
                  <argon-switch
                    :id="`present-${item.enrollmentId}`"
                    class="test"
                    v-model="item.present"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary btn-sm" @click="submitAttendance">
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
      <p v-else-if="!loading">
        Please select a class to view attendance records.
      </p>
    </div>
  </page-layout>
</template>
<style>
.form-check-input {
  height: 1.83em !important;
}
</style>

