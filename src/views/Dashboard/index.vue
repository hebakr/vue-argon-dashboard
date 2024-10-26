<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";
import AdminDashboard from "./AdminDashboard.vue";
import TeacherDashboard from "./TeacherDashboard.vue";
import StudentDashboard from "./StudentDashboard.vue";

const authStore = useAuthStore();
const { params } = useRoute();
const currentRoles = computed(() => {
  const user = authStore.currentUser;

  if (user.roles) return user.roles;

  const schoolId = params.schoolId; //schoolsStore.currentSchool.id;
  return user.memberships.filter((m) => m.schoolId == schoolId)[0].roles;
});

const userHasAdminRole = computed(() => {
  return currentRoles.value.includes('super_admin') || 
    currentRoles.value.includes('brand_admin') || 
    currentRoles.value.includes('school_admin') 
})

const userHasTeacherRole = computed(() => {
  return currentRoles.value.includes('teacher')
})

const userHasStudentRole = computed(() => {
  return currentRoles.value.includes('student')
})
</script>
<template>
  <div>
    <admin-dashboard v-if="userHasAdminRole"/>
    <teacher-dashboard v-if="userHasTeacherRole"/>
    <student-dashboard v-if="userHasStudentRole"/>
  </div>
</template>