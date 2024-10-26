<!--
=========================================================
* Vue Argon Dashboard 2 - v4.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<script setup>
import { computed, onMounted } from "vue";
import { useTemplateStore } from "@/store/templateStore";
import { useRoute } from "vue-router";
import { useSchoolsStore } from "./store/schools";
import { useAuthStore } from "./store/auth";

const route = useRoute();
const store = useSchoolsStore();
const authStore = useAuthStore();
const schoolId = computed(() => route.params.schoolId);

const templateStore = useTemplateStore();

onMounted(() => {
  store.findById(schoolId.value);
  // update current user with the latest school visited
  authStore.updateLastSchool(schoolId.value);
});

templateStore.showNavbar = true;
templateStore.showSidenav = true;
templateStore.showFooter = true;
templateStore.hideConfigButton = false;
</script>
<template>
  <router-view />
</template>
