import { defineStore } from "pinia";

export const useTemplateStore = defineStore({
  id: "template",
  state: () => ({
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
  }),
  actions: {
    toggleConfigurator() {
      this.showConfig = !this.showConfig;
    },
    sidebarMinimize() {
      let sidenav_show = document.querySelector("#app");
      if (this.isPinned) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        this.isPinned = false;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        this.isPinned = true;
      }
    },

    setSidebarType(type) {
      this.sidebarType = type;
    },
    navbarFixed() {
      if (this.isNavFixed === false) {
        this.isNavFixed = true;
      } else {
        this.isNavFixed = false;
      }
    },
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
});
