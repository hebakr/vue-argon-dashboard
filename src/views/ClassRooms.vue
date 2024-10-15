
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList.vue";
import { useRoomsStore } from "../store/class-rooms";
import { useRoute } from "vue-router";
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
  await store.deleteRoom(item);
  store.fetchRooms(params.schoolId);
};

const handleSubmit = async (data) => {
  submitting.value = true;
  await store.saveRoom(data);
  submitting.value = false;
  formOpen.value = false;
  store.fetchRooms(params.schoolId);
};

const store = useRoomsStore();
onMounted(() => store.fetchRooms(params.schoolId));
</script>

<template>
  <crud-list
    actionTitle="Add Class Room"
    title="Class rooms"
    :columns="columns"
    :data="store.rooms"
    :initialFormData="{ name: '', active: true, schoolId: params.schoolId }"
    :submitting="submitting"
    :formOpen="formOpen"
    :modelName="'Class Room'"
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
