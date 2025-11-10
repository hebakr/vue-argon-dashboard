
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList";
import { useClassRoomsStore } from "../store/class-rooms";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
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
    showAction: true,
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
  toast("Room deleted");
};

const handleSubmit = async (data) => {
  const response = await store.save(data);
  if (response.error) {
    toast.error(response.error);
  } else {
    toast.success(`Room ${data.id > 0 ? "updated" : "created"} successfully!`);
    store.findAll(params.schoolId);
    formOpen.value = false;
  }
  submitting.value = false;
};
const fd = { name: "", active: true, schoolId: params.schoolId };
const initialFormData = ref(fd);

const handleFormOpen = (item) => {
  formOpen.value = true;
  initialFormData.value = item == null ? { ...fd } : { ...item };
};

const store = useClassRoomsStore();
onMounted(() => store.findAll(params.schoolId));
</script>

<template>
  <crud-list
    actionTitle="Add Class Room"
    title="Class rooms"
    :columns="columns"
    :data="store.list"
    :initialFormData="initialFormData"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Class Room'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    @onFormOpen="handleFormOpen"
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
