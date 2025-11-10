<script setup>
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonRadio from "@/components/ArgonRadio.vue";
import ParentForm from "./ParentForm.vue";
import { useGradesStore } from "@/store/grades";
import { useClassesStore } from "@/store/classes";
import AppSelect from "@/components/AppSelect.vue";
import { useSchoolsStore } from "@/store/schools";

const gradesStore = useGradesStore();
const classesStore = useClassesStore();
const schoolsStore = useSchoolsStore();
const { params } = useRoute();

onMounted(() => gradesStore.findAll(params.schoolId));

const model = defineModel();
const props = defineProps(["validator"]);

const gradeOptions = computed(() =>
  gradesStore.list.map((g) => {
    return { id: g.id, title: g.name };
  })
);

const classOptions = computed(() =>
  classesStore.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const academicYearsOption = computed(() =>
  schoolsStore.currentSchool.academicYears.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const genderOptions = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];

const statusOptions = [
  { id: "active", title: "Active" },
  { id: "pending", title: "Pending" },
  // { id: "graduated", title: "Graduated" },
  // { id: "transfered", title: "Transfered" },
];

const relegionOptions = [
  { id: "muslim", title: "Muslim" },
  { id: "crestine", title: "Crestine" },
];

const hasSibling = ref("no");

const handleGradeChange = (e) => {
  classesStore.findAll(params.schoolId, 1, "", { gradeId: e.target.value });
};
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Student information</h3>
      <div class="row">
        <div class="col-12 col-md-6">
          <argon-input
            id="firstName"
            v-model="model.student.firstName"
            :validator="validator.student.firstName"
            >First name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="lastName"
            v-model="model.student.lastName"
            :validator="validator.student.lastName"
            >Last name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="email"
            type="email"
            v-model="model.student.email"
            :validator="props.validator.student.email"
            >Email</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="birthdate"
            type="date"
            v-model="model.student.birthdate"
            :validator="props.validator.student.birthdate"
            >Birthdate</argon-input
          >
        </div>

        <div class="col-12 col-md-6">
          <app-select
            id="gender"
            name="gender"
            v-model="model.student.gender"
            :options="genderOptions"
            :validator="validator.student.gender"
            >Gender</app-select
          >
        </div>
        <div class="col-12 col-md-6">
          <app-select
            id="relegion"
            name="relegion"
            v-model="model.student.relegion"
            :options="relegionOptions"
            :validator="validator.student.relegion"
            >Relegion</app-select
          >
        </div>
        <div class="col-12 col-md-6">
          <app-select
            id="status"
            name="status"
            v-model="model.student.status"
            :options="statusOptions"
            :validator="validator.student.status"
            >Status</app-select
          >
        </div>
        <div class="col-12 col-md-6">
          <app-select
            id="gradeId"
            name="gradeId"
            v-model="model.student.gradeId"
            :options="gradeOptions"
            :validator="validator.student.gradeId"
            @onChange="handleGradeChange"
            >Grade</app-select
          >
        </div>
      </div>
      <div class="row" v-if="model.student.status == 'active'">
        <hr />
        <h4>Enrollment</h4>

        <div class="col-12 col-md-6">
          <app-select
            id="classsId"
            name="classsId"
            v-model="model.student.academicClassId"
            :options="classOptions"
            :validator="validator.student.academicClassId"
            >Class</app-select
          >
        </div>
        <div class="col-12 col-md-6">
          <app-select
            id="academicYear"
            name="academicYear"
            v-model="model.student.academicYearId"
            :options="academicYearsOption"
            :validator="validator.student.academicYearId"
            >Academic Year</app-select
          >
        </div>
        <h4>User account</h4>

        <div class="col-12 col-md-6">
          <argon-input
            id="username"
            type="text"
            v-model="model.student.username"
            :validator="props.validator.student.username"
            >Username</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="password"
            type="password"
            v-model="model.student.password"
            :validator="props.validator.student.password"
            >Password</argon-input
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <p>Is Sibiling studying in the same school?</p>
    <argon-radio id="sibling-yes" name="g1" value="yes" v-model="hasSibling">
      Yes</argon-radio
    >
    <argon-radio id="sibling-no" name="g1" value="no" v-model="hasSibling"
      >No</argon-radio
    >
  </div>
  <div v-if="hasSibling == 'yes'">show form to select the sibling student</div>
  <div v-else>
    <parent-form
      title="Father information"
      v-model="model.father"
      :validator="validator.father"
    ></parent-form>
    <parent-form
      title="Mother information"
      v-model="model.mother"
      :validator="validator.mother"
    ></parent-form>
    <div class="container-fluid">
      <p><strong>Gardian</strong></p>
      <argon-radio
        id="sibling-yes"
        name="g2"
        value="father"
        v-model="model.gardianParent"
      >
        Father</argon-radio
      >
      <argon-radio
        id="sibling-yes"
        name="g2"
        value="mother"
        v-model="model.gardianParent"
      >
        Mother</argon-radio
      >
      <argon-radio
        id="sibling-yes"
        name="g2"
        value="other"
        v-model="model.gardianParent"
      >
        Other</argon-radio
      >
    </div>
    <parent-form
      v-if="model.gardianParent == 'other'"
      title="Gardian information"
      v-model="model.gardian"
      :validator="validator.gardian"
    ></parent-form>
  </div>
</template>
