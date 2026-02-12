import ClassDetails from "../views/ClassDetails.vue";
import Classes from "../views/Classes.vue";
import ClassRooms from "../views/ClassRooms.vue";
import Configurations from "../views/Configurations.vue";
import Dashboard from "../views/Dashboard";
import Grades from "../views/Grades";
import Profile from "../views/Profile.vue";
import StudentDetails from "../views/StudentDetails.vue";
import Students from "../views/Students.vue";
import Subjects from "../views/Subjects.vue";
import Teachers from "../views/Teachers.vue";
import TimeTables from "../views/TimeTables.vue";
import Parents from "../views/Parents.vue";
import Attendance from "../views/Attendance.vue";
import FeeCategories from "../views/FeeCategories.vue";
import Fees from "../views/Fees.vue";
import Admissions from "../views/Admissions/Dashboard.vue";

const routes = [
  {
    path: "",
    redirect: { name: "dashboard" },
  },
  {
    path: "dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "admissions",
    name: "admissions",
    component: Admissions,
  },
  {
    path: "admissions/all",
    name: "admissions-all",
    component: <h1>All Applications</h1>,
  },
  {
    path: "students",
    name: "students",
    component: Students,
  },
  {
    path: "students/:id",
    name: "studentDetails",
    component: StudentDetails,
  },
  {
    path: "teachers",
    name: "teachers",
    component: Teachers,
  },
  {
    path: "parents",
    name: "parents",
    component: Parents,
  },

  {
    path: "time-tables",
    name: "time-tables",
    component: TimeTables,
  },
  {
    path: "attendance",
    name: "attendance",
    component: Attendance,
  },
  {
    path: "fees",
    name: "fees",
    component: Fees,
  },
  {
    path: "configurations",
    name: "configurations",
    component: Configurations,
    children: [
      {
        path: "",
        redirect: { name: "subjects" },
      },
      {
        path: "subjects",
        name: "subjects",
        component: Subjects,
      },
      {
        path: "time-table-profiles",
        name: "time-table-profiles",
        component: <h1>Time table profiles</h1>,
      },
      {
        path: "fee-categories",
        name: "fee-categories",
        component: FeeCategories,
      },
      {
        path: "class-rooms",
        name: "class-rooms",
        component: ClassRooms,
      },
      {
        path: "classes",
        name: "classes",
        component: Classes,
      },
      {
        path: "classes/:id",
        name: "classDetails",
        component: ClassDetails,
      },
      {
        path: "grades",
        name: "grades",
        component: Grades,
      },
    ],
  },
  {
    path: "profile",
    name: "profile",
    component: Profile,
  },
];

export default routes;
