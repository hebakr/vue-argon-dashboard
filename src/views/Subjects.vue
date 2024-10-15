
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList.vue";
import { useSubjectsStore } from "../store/subjects";
import { useRoute } from "vue-router";

const store = useSubjectsStore();
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
    head: "Status",
    property: "active",
    formatter: (d) => (d ? "Active" : "Not active"),
  },
];

const handleDelete = async (item) => {
  await store.remove(item);
  store.findAll(params.schoolId);
};

const handleSubmit = async (data) => {
  submitting.value = true;
  await store.save(data);
  submitting.value = false;
  formOpen.value = false;
  store.findAll(params.schoolId);
};

onMounted(() => store.findAll(params.schoolId));
</script>

<template>
  <crud-list
    actionTitle="Add Subject"
    title="Subjects"
    :columns="columns"
    :data="store.list"
    :initialFormData="{ name: '', active: true, schoolId: params.schoolId }"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Subject'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="() => (formOpen = true)"
  >
    <template v-slot:form="{ formData }">
      <div class="form-group">
        <label for="example-text-input" class="form-control-label">Name</label>
        <input
          class="form-control"
          type="text"
          v-model="formData.name"
          value=""
          id="example-text-input"
        />
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
