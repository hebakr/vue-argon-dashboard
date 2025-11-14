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
    path: "configurations",
    name: "configurations",
    component: Configurations,
  },
  {
    path: "profile",
    name: "profile",
    component: Profile,
  },
];

export default routes;
