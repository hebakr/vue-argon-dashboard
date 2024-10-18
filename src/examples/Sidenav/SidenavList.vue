<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTemplateStore } from "@/store/templateStore";
// import ArgonButton from "../../components/ArgonButton.vue";
import SidenavItem from "./SidenavItem.vue";
import { useAuthStore } from "@/store/auth";
import { useSchoolsStore } from "../../store/schools";

const store = useTemplateStore();
const schoolsStore = useSchoolsStore();
const authStore = useAuthStore();
const isRTL = computed(() => store.isRTL);
const router = useRouter();
// const navItems = ref(schoolRoutes)

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};

const logout = async () => {
  await authStore.signout();
  router.push({ name: "signin" });
};

// const navItems = [
//   {
//     name: "dashboard",
//     title: isRTL.value ? "لوحة القيادة" : "Dashboard",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   {
//     name: "students",
//     title: isRTL.value ? "غرف الفصول" : "Students",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   {
//     name: "teachers",
//     title: isRTL.value ? "غرف الفصول" : "Teachers",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   {
//     name: "grades",
//     title: isRTL.value ? "غرف الفصول" : "Grades",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   {
//     name: "subjects",
//     title: isRTL.value ? "المواد الدراسية" : "Subjects",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   {
//     name: "class-rooms",
//     title: isRTL.value ? "غرف الفصول" : "Class Rooms",
//     icon: '<i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>',
//   },
//   // {
//   //   name: "tables",
//   //   title: isRTL.value ? " الجداول" : "Tables",
//   //   icon: '<i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>',
//   // },
//   // {
//   //   name: "clients",
//   //   title: isRTL.value ? "العملاء" : "Clients",
//   //   icon: '<i class="ni ni-credit-card text-success text-sm opacity-10"></i>',
//   // },
//   // {
//   //   name: "Brands",
//   //   title: isRTL.value ? "المنظمات" : "Brands",
//   //   icon: '<i class="ni ni-credit-card text-success text-sm opacity-10"></i>',
//   // },
// ];
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li
        class="nav-item"
        v-for="item in schoolsStore.schoolRoutes"
        :key="item.route"
      >
        <sidenav-item
          :to="item.route"
          :class="getRoute() === item.name ? 'active' : ''"
          :navText="$t(item.title)"
        >
          <template v-slot:icon>
            <span v-html="item.icon" />
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <hr />
      </li>

      <li class="nav-item">
        <a class="nav-link" @click="logout">
          <div
            class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
          >
            <i class="fa fa-sign-out text-dark text-sm opacity-10"></i>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            {{ isRTL ? "تسجيل الخروج" : "Signout" }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
