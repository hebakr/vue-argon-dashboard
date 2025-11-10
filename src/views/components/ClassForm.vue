<script setup>
import { onMounted, computed } from "vue";
import ArgonInput from "@/components/ArgonInput.vue";
import AppSelect from "@/components/AppSelect.vue";
import { useGradesStore } from "@/store/grades";
import { useRoute } from "vue-router";
import { useClassRoomsStore } from "@/store/class-rooms";

const model = defineModel();
defineProps(["validator"]);
const gradesStore = useGradesStore();
const classRoomsStore = useClassRoomsStore();
const { params } = useRoute();

onMounted(() => gradesStore.findAll(params.schoolId));
onMounted(() => classRoomsStore.findAll(params.schoolId));

const gradeOptions = computed(() =>
  gradesStore.list.map((item) => {
    return { id: item.id, title: item.name };
  })
);

const classRoomsOptions = computed(() =>
  classRoomsStore.list.map((item) => {
    return { id: item.id, title: item.name };
  })
);
</script>

<template>
  <argon-input
    id="title"
    name="title"
    v-model="model.title"
    :validator="validator.title"
    >Title</argon-input
  >
  <argon-input
    id="capacity"
    type="number"
    v-model="model.capacity"
    :validator="validator.capacity"
    >Capacity</argon-input
  >
  <app-select
      id="gradeId"
      name="gradeId"
      v-model="model.gradeId"
      :options="gradeOptions"
      :validator="validator.gradeId"
      >Grade</app-select
    >
    <app-select
      id="classRoomId"
      name="classRoomId"
      v-model="model.classRoomId"
      :options="classRoomsOptions"
      :validator="validator.classRoomId"
      >Class room</app-select
    >
  <div class="form-group">
    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        v-model="model.active"
        id="active"
      />
      <label class="custom-control-label" for="active">Active</label>
    </div>
  </div>
</template>

