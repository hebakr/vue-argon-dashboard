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
// "vue/no-multiple-template-root": "off",
import { computed } from "vue";
import { useTemplateStore } from "@/store/templateStore";
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";

const store = useTemplateStore();
const isNavFixed = computed(() => store.isNavFixed);
const darkMode = computed(() => store.darkMode);
const isAbsolute = computed(() => store.isAbsolute);
const showSidenav = computed(() => store.showSidenav);
const layout = computed(() => store.layout);
const showNavbar = computed(() => store.showNavbar);
const showFooter = computed(() => store.showFooter);
const showConfig = computed(() => store.showConfig);
const hideConfigButton = computed(() => store.hideConfigButton);
const toggleConfigurator = () => store.toggleConfigurator();

const navClasses = computed(() => {
  return {
    "position-sticky bg-white left-auto top-2 z-index-sticky":
      isNavFixed.value && !darkMode.value,
    "position-sticky bg-default left-auto top-2 z-index-sticky":
      isNavFixed.value && darkMode.value,
    "position-absolute px-4 mx-0 w-100 z-index-2": isAbsolute.value,
    "px-0 mx-4": !isAbsolute.value,
  };
});
</script>
<template>
  <div>
    <div
      v-show="layout === 'landing'"
      class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
    ></div>

    <sidenav v-if="showSidenav" />

    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    >
      <!-- nav -->

      <navbar :class="[navClasses]" v-if="showNavbar" />

      <router-view />

      <app-footer v-show="showFooter" />

      <configurator
        :toggle="toggleConfigurator"
        :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
      />
    </main>
  </div>
</template>
