import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import { createPinia } from "pinia";

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
