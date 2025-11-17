  <script setup>
import PageLayout from "@/components/PageLayout.vue";
import AppSelect from "@/components/AppSelect.vue";
import { onMounted, ref, computed } from "vue";
import { useClassesStore } from "@/store/classes";
import { useSchoolsStore } from "@/store/schools";
import { useRoute } from "vue-router";

const schoolsStore = useSchoolsStore();
const { params } = useRoute();
const store = useClassesStore();
const formData = ref({
  academicClassId: "",
});

const classOptions = computed(() =>
  store.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const loading = computed(() => store.loading);
onMounted(() => {
  store.findAll(params.schoolId);
});

const enrollments = ref([]);

const handleChange = async () => {
  enrollments.value = [];
  const data = await store.findById(
    params.schoolId,
    formData.value.academicClassId,
    schoolsStore.currentYear?.id || 0
  );
  enrollments.value = data.enrollments || [];
};
</script>

<template>
  <page-layout title="Attendance">
    <div class="container">
      <p>Attendance Page</p>
      <app-select
        id="classsId"
        name="classsId"
        v-model="formData.academicClassId"
        @onChange="handleChange"
        :options="classOptions"
        >Class</app-select
      >
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
      <div v-if="enrollments.length > 0">
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
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  Day
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P1
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P2
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P3
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P4
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P5
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P6
                </td>
                <td
                  class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
                >
                  P7
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="enrollment in enrollments" :key="enrollment.id">
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  ST-{{ enrollment.id }}
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
                        v-if="enrollment.student.gender === 'male'"
                      />
                      <img
                        src="@/assets/img/team-2.jpg"
                        class="avatar avatar-sm me-3"
                        alt="user1"
                        v-if="enrollment.student.gender === 'female'"
                      />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">
                        {{ enrollment.student.fullName }}
                      </h6>
                      <p class="text-xs text-secondary mb-0"></p>
                    </div>
                  </div>
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
                <td
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  <input type="checkbox" checked />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p v-else-if="!loading">
        Please select a class to view attendance records.
      </p>
    </div>
  </page-layout>
</template>

