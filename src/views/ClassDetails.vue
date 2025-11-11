<script setup>
import { ref, onMounted } from "vue";

import PageLayout from "../components/PageLayout.vue";
import { useClassesStore } from "@/store/classes";
import { useRoute } from "vue-router";
import { useSchoolsStore } from "@/store/schools";

const { params } = useRoute();
const schoolsStore = useSchoolsStore();
const currentYearId = schoolsStore.currentYear.id;

const data = ref({});
const store = useClassesStore();
onMounted(async () => {
  data.value = await store.findById(params.schoolId, params.id, currentYearId);
});
</script>
<template>
  <page-layout :title="data?.title">
    <div class="container">
      <div class="card">
        <div class="card-header pb-0">
          <h6>Authors table</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Author
                  </th>
                  <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                    Function
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Status
                  </th>
                  <th
                    class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                  >
                    Employed
                  </th>
                  <th class="text-secondary opacity-7"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in data.enrollments" :key="e.id">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img
                          src="@/assets/img/team-2.jpg"
                          class="avatar avatar-sm me-3"
                          alt="user1"
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ e.student.fullName }}</h6>
                        <p class="text-xs text-secondary mb-0">
                          
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">Manager</p>
                    <p class="text-xs text-secondary mb-0">Organization</p>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm bg-gradient-success"
                      >Online</span
                    >
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold"
                      >23/04/18</span
                    >
                  </td>
                  <td class="align-middle">
                    <a
                      href="javascript:;"
                      class="text-secondary font-weight-bold text-xs"
                      data-toggle="tooltip"
                      data-original-title="Edit user"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>
