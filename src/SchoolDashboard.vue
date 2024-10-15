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
import { onMounted } from "vue";
import { useTemplateStore } from "@/store/templateStore";
import { useRoute } from "vue-router";
import { useSchoolsStore } from "./store/schools";

const route = useRoute();
const store = useSchoolsStore();

const templateStore = useTemplateStore();

onMounted(() => store.findById(route.params.schoolId));

templateStore.showSidenav = true;
templateStore.hideConfigButton = false;
</script>
<template>
  <router-view />
</template>
