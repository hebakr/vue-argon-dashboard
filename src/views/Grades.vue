
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList";
import { useRoute } from "vue-router";
import { useGradesStore } from "../store/grades";
import { useToast } from "vue-toastification";
import { helpers, required } from "@vuelidate/validators";
import ArgonInput from "@/components/ArgonInput.vue";

const toast = useToast();

const store = useGradesStore();
const { params } = useRoute();

const submitting = ref(false);
const formOpen = ref(true);

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
    head: "Section",
    property: "sectionTitle",
  },
  {
    head: "Status",
    property: "active",
    formatter: (d) => (d ? "Active" : "Not active"),
  },
];

const handleDelete = async (item) => {
  const response = await store.remove(item);
  if (response.error) {
    toast.error(response.error);
  } else {
    store.findAll(params.schoolId);
    toast.info("Grade deleted!");
  }
};

const handleSubmit = async (data) => {
  submitting.value = true;
  const response = await store.save(data);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(`Grade ${data.id > 0 ? "updated" : "created"} successfully!`);
    store.findAll(params.schoolId);
    formOpen.value = false;
  }
  submitting.value = false;
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
    title="Grades"
    actionTitle="Add Grade"
    :columns="columns"
    :data="store.list"
    :initialFormData="{
      name: '',
      section: 'primary',
      active: true,
      schoolId: params.schoolId,
    }"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Grade'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="() => (formOpen = true)"
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
      <div class="form-check">
        <input
          type="radio"
          id="radioPre"
          value="pre_school"
          class="form-check-input"
          v-model="formData.section"
        />
        <label class="custom-control-label" for="radioPre">Pre school</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          id="radioPrimary"
          value="primary"
          class="form-check-input"
          v-model="formData.section"
        />
        <label class="custom-control-label" for="radioPrimary">Primary</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          id="radioSec"
          value="secondary"
          class="form-check-input"
          v-model="formData.section"
        />
        <label class="custom-control-label" for="radioSec">Secondary</label>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="formData.active"
            id="active"
          />
          <label class="custom-control-label" for="active">Active</label>
        </div>
      </div>
    </template>
  </crud-list>
</template>
