
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList";
import { useGradesStore } from "../store/grades";
import { useRoute } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
import { useSubjectsStore } from "../store/subjects";
import { required, email, helpers } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { useTeachersStore } from "../store/teachers";
import { useSchoolsStore } from "../store/schools";

const { params } = useRoute();
const submitting = ref(false);
const formOpen = ref(true);
const teacherToEdit = ref(null);
const toast = useToast();

const store = useTeachersStore();
const gradesStore = useGradesStore();
const subjectsStore = useSubjectsStore();
const schoolsStore = useSchoolsStore();

const columns = [
  {
    head: "Name",
    property: "fullName",
  },
  {
    head: "email",
    property: "email",
  },
  {
    head: "phone",
    property: "phone",
  },
  {
    head: "Gender",
    property: "gender",
  },
  {
    head: "Status",
    property: "status",
    formatter: (d) => (d ? "Active" : "Not active"),
  },
];

const handleDelete = async (item) => {
  const response = await store.remove(item);
  if (response.error) {
    toast.error(response.error);
  } else {
    store.findAll(params.schoolId);
    toast.info("Teacher deleted!");
  }
};

const fd = {
  schoolId: params.schoolId,
  gender: "male",
  status: true,
};
const initialFormData = ref(fd);

const handleFormOpen = (item) => {
  console.log(item);
  formOpen.value = true;
  initialFormData.value = item == null ? { ...fd } : { ...item };
  teacherToEdit.value = item;
};

const handleSubmit = async (data) => {
  submitting.value = true;
  const response = await store.save(data);
  console.log(response);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(
      `Teacher ${data.id > 0 ? "updated" : "created"} successfully!`
    );
    store.findAll(params.schoolId);
    formOpen.value = false;
  }
  submitting.value = false;
};

const handlePageChanged = (page) => {
  store.findAll(params.schoolId, page);
};

onMounted(() => gradesStore.findAll(params.schoolId));
onMounted(() => subjectsStore.findAll(params.schoolId));
onMounted(() => store.findAll(params.schoolId));

const phone = helpers.regex(
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/
);

const { withAsync } = helpers;
const uniqueEmail = withAsync(async (value) => {
  const exists = await schoolsStore.isUserExist(
    value,
    params.schoolId,
    "teacher",
    teacherToEdit.value?.userId
  );

  return !exists;
});
const formValidations = {
  firstName: {
    required: helpers.withMessage("First name is required", required),
  },
  lastName: {
    required: helpers.withMessage("Last name is required", required),
  },
  email: {
    required,
    email,
    uniqueEmail: helpers.withMessage(
      "This email already exist on the current school",
      uniqueEmail
    ),
  },
  gradeIds: { required },
  subjectIds: { required },
  phone: {
    required,
    phone: helpers.withMessage("Please enter a valid phone number", phone),
  },
};
</script>

<template>
  <crud-list
    actionTitle="Add Teacher"
    title="Teachers"
    :columns="columns"
    :data="store.list.collection"
    :metadata="store.list.metadata"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formValidationRules="formValidations"
    :formOpen="formOpen"
    :modelName="'Teacher'"
    :loading="store.loading"
    @onDelete="handleDelete"
    @onFormOpen="handleFormOpen"
    @onSubmit="handleSubmit"
    @pageChanged="handlePageChanged"
    formSize="xl"
  >
    <template #form="{ formData, validator }">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Teacher information</h3>
          <div class="row">
            <div class="col-12 col-md-6">
              <argon-input
                id="firstName"
                v-model="formData.firstName"
                :validator="validator.firstName"
                >First name</argon-input
              >
            </div>
            <div class="col-12 col-md-6">
              <argon-input
                id="lastName"
                v-model="formData.lastName"
                :validator="validator.lastName"
                >Last name</argon-input
              >
            </div>
            <div class="col-12 col-md-6">
              <argon-input
                id="email"
                type="email"
                v-model="formData.email"
                :validator="validator.email"
                >Email</argon-input
              >
            </div>
            <div class="col-12 col-md-6">
              <argon-input
                id="phone"
                v-model="formData.phone"
                :validator="validator.phone"
                >Phone</argon-input
              >
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="" class="form-control-label">Gender</label>
                <select class="form-control" v-model="formData.gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Grades</label
                >
                <select
                  class="form-control"
                  multiple
                  v-model="formData.gradeIds"
                >
                  <option
                    v-for="g in gradesStore.list"
                    :key="g.id"
                    :value="g.id"
                  >
                    {{ g.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Subjects</label
                >
                <select
                  class="form-control"
                  multiple
                  v-model="formData.subjectIds"
                >
                  <option
                    v-for="g in subjectsStore.list"
                    :key="g.id"
                    :value="g.id"
                  >
                    {{ g.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </crud-list>
</template>

