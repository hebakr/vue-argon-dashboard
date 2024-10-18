import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import ArgonDashboard from "./argon-dashboard";

const i18n = createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: {
      nav: {
        dashboard: "Dashboard",
        students: "Students",
        teachers: "Teachers",
        subjects: "Subjects",
        classRooms: "Class Rooms",
        grades: "Grades",
      },
      teacher: {
        firstName: "Hello world",
      },
      subjects: {
        title: "Subjects",
        model: "Subject",
        add: "Add Subject",
      },
    },
    ar: {
      nav: {
        dashboard: "لوحة التحكم",
        students: "الطلاب",
        teachers: "المدرسين",
      },
      subjects: {
        title: "المواد الدراسية",
        model: "المادة الدراسية",
        add: "إضافة مادة دراسية",
      },
      message: {
        hello: "مرحبا",
      },
    },
  },
});

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(i18n);
appInstance.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.BOTTOM_LEFT,
});
appInstance.mount("#app");
