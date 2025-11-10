
<script setup>
import { useSchoolsStore } from "@/store/schools";
import { computed } from "vue";
const schoolsStore = useSchoolsStore();

const activeYear = computed(() =>
  schoolsStore.currentSchool.academicYears.find(
    (y) => y.id == schoolsStore.activeYear
  )
);

const showSelector = computed(
  () =>
    schoolsStore.currentSchool &&
    schoolsStore.currentSchool.academicYears.length > 1
);

const notActiveYears = computed(() =>
  schoolsStore.currentSchool.academicYears.filter(
    (y) => y.id != schoolsStore.activeYear
  )
);
</script>

<template>
  <div class="dropdown" v-if="showSelector">
    <button
      class="btn btn-default"
      style="margin-bottom: 0; color: #fff"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Academic year: {{ activeYear?.title }}
    </button>
    <ul class="dropdown-menu">
      <li v-for="y in notActiveYears" :key="y.id">
        <a
          class="dropdown-item"
          href="javascript:;"
          @click="() => schoolsStore.setActiveYear(y.id)"
          >Academic year: {{ y.title }}</a
        >
      </li>
    </ul>
  </div>
</template>
