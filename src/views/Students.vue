
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import StudentForm from "./components/students/StudentForm.vue";
import { useRoute } from "vue-router";
import CrudList from "@/components/CrudList";
import { useStudentsStore } from "@/store/students";
import { required, email, helpers, requiredIf } from "@vuelidate/validators";
import { useSchoolsStore } from "@/store/schools";
import { useToast } from "vue-toastification";
const schoolsStore = useSchoolsStore();

const formOpen = ref(true);
const submitting = ref(false);
const toast = useToast();

const otherParent = computed(() => initialFormData.gardianParent == "other");
const activeStudent = computed(
  () => initialFormData.student.status == "active"
);
const initialFormData = reactive({
  schoolId: 1,
  gardianParent: "father",
  test: "test",
  student: {
    firstName: "",
    lastName: "",
    gradeId: "",
    academicClassId: "",
    gender: "",
    relegion: "muslim",
    status: "",
    academicYearId: "",
  },
  father: {
    firstName: "",
    lastName: "",
  },
  mother: {
    firstName: "",
    lastName: "",
  },
  gardian: {},
});

const handleEdit = () => {
  initialFormData.student.academicYear = schoolsStore.currentYear?.id;
};
const handleSubmit = async (data) => {
  submitting.value = true;
  const response = await store.save(data);
  console.log(response);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(
      // `Teacher ${data.id > 0 ? "updated" : "created"} successfully!`
      `Teacher created successfully!`
    );
    store.findAll(params.schoolId);
    formOpen.value = false;
  }
  submitting.value = false;
};

const formValidations = {
  student: {
    firstName: {
      required: helpers.withMessage("First name is required", required),
    },
    lastName: {
      required: helpers.withMessage("Last name is required", required),
    },
    birthdate: { required },
    gradeId: {
      required,
    },
    gender: {
      required,
    },
    academicClassId: {
      required: helpers.withMessage(
        "Please select class to enroll student",
        requiredIf(activeStudent)
      ),
    },
    academicYearId: {
      required: helpers.withMessage(
        "Please select academic year to enroll student",
        requiredIf(activeStudent)
      ),
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
    action: "show",
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
