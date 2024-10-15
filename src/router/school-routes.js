import ClassRooms from "../views/ClassRooms.vue";
import Dashboard from "../views/Dashboard.vue";
import Grades from "../views/Grades";
import Students from "../views/Students.vue";
import Subjects from "../views/Subjects.vue";
import Teachers from "../views/Teachers.vue";

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
    path: "students",
    name: "students",
    component: Students,
  },
  {
    path: "teachers",
    name: "teachers",
    component: Teachers,
  },
  {
    path: "grades",
    name: "grades",
    component: Grades,
  },
  {
    path: "subjects",
    name: "subjects",
    component: Subjects,
  },
  {
    path: "class-rooms",
    name: "class-rooms",
    component: ClassRooms,
  },
];

export default routes;
