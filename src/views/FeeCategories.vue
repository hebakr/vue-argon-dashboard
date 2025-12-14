
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList";
import { useRoute } from "vue-router";
import { useFeesCategoriesStore } from "../store/fees_categories";
import { useToast } from "vue-toastification";
import { helpers, required } from "@vuelidate/validators";
import ArgonInput from "@/components/ArgonInput.vue";

const toast = useToast();

const store = useFeesCategoriesStore();
const { params } = useRoute();

const submitting = ref(false);
const formOpen = ref(true);
const fd = {
  name: "",
  description: "",
  schoolId: params.schoolId,
};
const initialFormData = ref(fd);

const columns = [
  {
    head: "ID",
    property: "id",
  },
  {
    head: "Name",
    property: "name",
  },
  {
    head: "Description",
    property: "description",
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
  const response = await store.save(data);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(
      `Category ${data.id > 0 ? "updated" : "created"} successfully!`
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
  name: {
    required: helpers.withMessage("Name is required", required),
  },
};

onMounted(() => store.findAll(params.schoolId));
</script>
<template>
  <crud-list
    title="Fees Categories"
    actionTitle="Add Category"
    :columns="columns"
    :data="store.list"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Category'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="handleFormOpen"
    :formValidationRules="formValidations"
  >
    <template v-slot:form="{ formData, validator }">
      <div class="form-group">
        <argon-input
          id="name"
          v-model="formData.name"
          :validator="validator.name"
          >Name</argon-input
        >
      </div>
      <div class="form-group">
        <argon-input
          id="description"
          v-model="formData.description"
          :validator="validator.description"
          >Description</argon-input
        >
      </div>
    </template>
  </crud-list>
</template>
