import { createRouter, createWebHistory } from "vue-router";
import Signin from "../views/Signin.vue";
import AuthLayout from "../AuthLayout.vue";
import DashboardLayout from "../DashboardLayout.vue";
import { useAuthStore } from "@/store/auth";
import Brands from "../views/Brands.vue";
import BrandDetails from "../views/BrandDetails.vue";
import SchoolDashboard from "@/SchoolDashboard.vue";
import schoolRoutes from "./school-routes";
import AcceptInvitation from "../views/AcceptInvitation.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,

    meta: {
      requireLogin: true,
    },
    children: [
      {
        path: "",
        redirect: () => {
          const store = useAuthStore();

          if (store.currentUser.roles?.includes("super_admin"))
            return { name: "Brands" };
          else {
            const schoolId = store.currentUser.lastVisitedSchool || store.currentUser.memberships[0].schoolId;
            return { name: "dashboard", params: { schoolId } };
          }
        },
      },
      {
        path: "brands",
        name: "Brands",
        component: Brands,
      },
      {
        path: "brands/:brandId",
        name: "BrandDetails",
        component: BrandDetails,
      },
      {
        path: "/app/:schoolId",
        name: "SchoolDashboard",
        component: SchoolDashboard,
        children: schoolRoutes,
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "signin",
        name: "signin",
        component: Signin,
      },
      {
        path: "accept-invitation",
        name: "teacherInvite",
        component: AcceptInvitation,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, _, next) => {
  document.title = to.meta.title || "School board";
  // console.log(to)
  const store = useAuthStore();
  if (!store.isLoggedIn && to.name !== "signin") location.href = "/auth/signin";
  else next();
});

export default router;
