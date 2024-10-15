<script setup>
import { computed } from "vue";
import { useTemplateStore } from "@/store/templateStore";

const store = useTemplateStore();
const isRTL = computed(() => store.isRTL);
const sidebarMinimize = () => store.sidebarMinimize();

const minimizeSidebar = () => {
  if (window.innerWidth < 1200) {
    sidebarMinimize();
  }
};

defineProps(["to", "navText"]);
</script>
<template>
  <router-link :to="to" class="nav-link" @click="minimizeSidebar">
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
      navText
    }}</span>
  </router-link>
</template>
