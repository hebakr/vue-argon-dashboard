
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import StudentForm from "./components/students/StudentForm.vue";
import { useRoute } from "vue-router";
import CrudList from "@/components/CrudList";
import { useStudentsStore } from "../store/students";
import { required, email, helpers, requiredIf } from "@vuelidate/validators";

const formOpen = ref(true);

const otherParent = computed(() => initialFormData.gardianParent == "other");
const initialFormData = reactive({
  gardianParent: "father",
  student: {
    firstName: "a",
    lastName: "b",
  },
  father: {
    firstName: "parent first name",
    lastName: "b",
  },
  mother: {
    firstName: "mother first name",
    lastName: "b",
  },
  gardian: {},
});

const handleSubmit = async (data) => {
  console.log(data);
};

const formValidations = {
  student: {
    firstName: {
      required: helpers.withMessage("First name is required", required),
    },
    lastName: {
      required: helpers.withMessage("Last name is required", required),
    },
    email: {
      required,
      email,
    },
  },
  father: {
    firstName: {
      required: helpers.withMessage("First name is required", required),
    },
    lastName: {
      required: helpers.withMessage("Last name is required", required),
    },
    email: {
      required,
      email,
    },
  },
  mother: {
    firstName: {
      required: helpers.withMessage("First name is required", required),
    },
    lastName: {
      required: helpers.withMessage("Last name is required", required),
    },
    email: {
      required,
      email,
    },
  },
  gardian: {
    firstName: {
      required: helpers.withMessage(
        "First name is required",
        requiredIf(otherParent)
      ),
    },
    email: {
      email,
      required: helpers.withMessage(
        "Email is required",
        requiredIf(otherParent)
      ),
    },
  },
};

const columns = [
  {
    head: "Name",
    property: "fullName",
  },
  {
    head: "Gender",
    property: "gender",
  },
  {
    head: "Relegion",
    property: "relegion",
  },
  {
    head: "Status",
    property: "status",
  },
];

const { params } = useRoute();
const store = useStudentsStore();

onMounted(() => store.findAll(params.schoolId));
</script>

<template>
  <crud-list
    actionTitle="Add Student"
    title="Students"
    :columns="columns"
    :data="store.list"
    :loading="store.loading"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formValidationRules="formValidations"
    :formOpen="formOpen"
    :modelName="'Student'"
    @onDelete="handleDelete"
    @onFormOpen="handleEdit"
    @onSubmit="handleSubmit"
    formSize="xl"
  >
    <template #form="{ validator }">
      <student-form v-model="initialFormData" :validator="validator" />
    </template>
  </crud-list>
</template>
