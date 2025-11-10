<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useClassesStore } from "@/store/classes";
import CrudList from "@/components/CrudList";
import ClassForm from "./components/ClassForm.vue";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useClassesStore();
const { params } = useRoute();
const formOpen = ref(true);
const submitting = ref(false);
const columns = [
  {
    head: "ID",
    property: "id",
  },
  {
    head: "Title",
    property: "title",
  },
  {
    head: "Capacity",
    property: "capacity",
  },
  {
    head: "Grade",
    property: "gradeName",
  },
  {
    head: "Class room",
    property: "roomName",
  },
  {
    head: "Status",
    property: "active",
    formatter: (d) => (d ? "Active" : "Not active"),
  },
];

const formValidations = {
  form: {
    title: { required },
    capacity: { required },
  },
};
onMounted(() => store.findAll(params.schoolId));

/* handlers */
const handleSubmit = async (data) => {
  submitting.value = true;
  const response = await store.save(data.form);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(
      `Class ${data.form.id > 0 ? "updated" : "created"} successfully!`
    );
    store.findAll(params.schoolId);
    formOpen.value = false;
  }
  submitting.value = false;
};

const handleDelete = async (item) => {
  const response = await store.remove(item);
  if (response.error) {
    toast.error(response.error);
  } else {
    store.findAll(params.schoolId);
    toast.info("Class deleted!");
  }
};

const fd = {
  form: {
    title: "",
    capcity: 50,
    gradeId: "",
    classRoomId: "",
    active: true,
    schoolId: params.schoolId,
  },
};
const initialFormData = ref(fd);

const handleFormOpen = (item) => {
  formOpen.value = true;
  initialFormData.value = item == null ? { ...fd } : { form: { ...item } };
};
</script>
<template>
  <crud-list
    title="Classes"
    actionTitle="Add Class"
    :columns="columns"
    :data="store.list"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Class'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="handleFormOpen"
    :formValidationRules="formValidations"
  >
    <template #form="{ validator }">
      <class-form v-model="initialFormData.form" :validator="validator.form" />
    </template>
  </crud-list>
</template>
