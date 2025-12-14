
<script setup>
import { onMounted, ref, computed } from "vue";
import CrudList from "@/components/CrudList";
import { useRoute } from "vue-router";
import { useFeesStructuresStore } from "../store/fees_structures";
import { useToast } from "vue-toastification";
import { helpers, required } from "@vuelidate/validators";
import ArgonInput from "@/components/ArgonInput.vue";
import AppSelect from "@/components/AppSelect.vue";
import { useGradesStore } from "@/store/grades";
import { useSchoolsStore } from "@/store/schools";
import { useFeesCategoriesStore } from "@/store/fees_categories";
import { useBusRoutesStore } from "@/store/bus-routes";
import ArgonSwitch from "@/components/ArgonSwitch.vue";

const schoolsStore = useSchoolsStore();
const gradesStore = useGradesStore();
const feeCategoriesStore = useFeesCategoriesStore();
const busRoutesStore = useBusRoutesStore();
const toast = useToast();

onMounted(() => {
  gradesStore.findAll(params.schoolId);
  feeCategoriesStore.findAll(params.schoolId);
  busRoutesStore.findAll(params.schoolId);
});

const gradeOptions = computed(() =>
  gradesStore.list.map((item) => {
    return { id: item.id, title: item.name };
  })
);

const feeCategoryOptions = computed(() =>
  feeCategoriesStore.list.map((item) => {
    return { id: item.id, title: item.name };
  })
);

const busRouteOptions = computed(() =>
  busRoutesStore.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const scheduleOptions = [
  { id: "term", title: "Term" },
  { id: "month", title: "Month" },
  { id: "year", title: "Year" },
];

const store = useFeesStructuresStore();
const { params } = useRoute();

const submitting = ref(false);
const formOpen = ref(true);
const fd = {
  gradeId: "",
  busRouteId: "",
  feeCategoryId: "",
  academicYearId: schoolsStore.currentYear?.id || "",
  schoolId: params.schoolId,
  amount: "",
  schedule: "term",
  isOptional: false,
};
const initialFormData = ref(fd);

const columns = [
  {
    head: "ID",
    property: "id",
  },
  {
    head: "Grade",
    property: "grade",
    formatter: (item) => (item ? item.name : "All Grades"),
  },
  {
    head: "Category",
    property: "feeCategory",
    formatter: (item, row) => {
      let content = item ? item.name : "";
      if (row.busRoute != null) {
        content += ` (Route: ${row.busRoute.title})`;
      }
      return content;
    },
  },
  {
    head: "Amount",
    property: "amount",
  },
  {
    head: "Schedule",
    property: "schedule",
    formatter: (item) => item.charAt(0).toUpperCase() + item.slice(1),
  },
  {
    head: "Type",
    property: "isOptional",
    formatter: (item) =>
      item
        ? "<p class='badge bg-success'>Optional</p>"
        : "<p class='badge bg-info'>Mandatory</p>",
  },
];

const handleDelete = async (item) => {
  const response = await store.remove(item);
  if (response.error) {
    toast.error(response.error);
  } else {
    store.findAll(params.schoolId);
    toast.info("Category deleted!");
  }
};

const handleSubmit = async (data) => {
  submitting.value = true;
  console.log("Submitting data", data);
  const response = await store.save(data);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(
      `Fees structure ${data.id > 0 ? "updated" : "created"} successfully!`
    );
    store.findAll(params.schoolId);
    formOpen.value = false;
  }

  submitting.value = false;
  initialFormData.value = { ...fd };
};

const handleFormOpen = (item) => {
  console.log(item);
  console.log("FD", fd);
  formOpen.value = true;
  initialFormData.value = item === undefined ? { ...fd } : { ...item };
};

const formValidations = {
  amount: {
    required: helpers.withMessage("Amount is required", required),
  },
  feeCategoryId: {
    required: helpers.withMessage("Fee Category is required", required),
  },
  schedule: {
    required: helpers.withMessage("Schedule is required", required),
  },
};

onMounted(() => store.findAll(params.schoolId));
</script>

<template>
  <crud-list
    title="Fees Structures"
    actionTitle="Add Fees Structure"
    :columns="columns"
    :data="store.list"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Fees Structure'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="handleFormOpen"
    :formValidationRules="formValidations"
  >
    <template v-slot:form="{ formData, validator }">
      <div class="form-group">
        <app-select
          id="feeCategoryId"
          name="feeCategoryId"
          v-model="formData.feeCategoryId"
          :options="feeCategoryOptions"
          prompt="Select Category"
          >Category</app-select
        >
      </div>
      <div class="form-group">
        <app-select
          id="gradeId"
          name="gradeId"
          v-model="formData.gradeId"
          :options="gradeOptions"
          prompt=" All Grades"
          >Grade</app-select
        >
      </div>
      <div class="form-group">
        <app-select
          id="busRouteId"
          name="busRouteId"
          v-model="formData.busRouteId"
          :options="busRouteOptions"
          prompt=" Select Bus Route"
          >Route (only if applicable)</app-select
        >
      </div>

      <div class="form-group">
        <app-select
          id="schedule"
          name="schedule"
          v-model="formData.schedule"
          :options="scheduleOptions"
          prompt="Select Schedule"
          >Payment Schedule</app-select
        >
      </div>
      <div class="form-group">
        <argon-input
          id="amount"
          v-model="formData.amount"
          :validator="validator.amount"
          >Amount</argon-input
        >
      </div>
      <div class="form-group">
        <argon-switch
          id="is-optional"
          name="is-optional"
          v-model="formData.isOptional"
          >Optional</argon-switch
        >
      </div>
    </template>
  </crud-list>
</template>
