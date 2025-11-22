
<script setup>
import TimeTableSlot from "./TimeTableSlot.vue";
defineProps({
  day: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits("selectTeacherAndSubject");
const handleSelectTeacherAndSubject = (timeSlot) => {
  emit("selectTeacherAndSubject", timeSlot);
};
</script>

<template>
  <div class="row align-items-center mb-3">
    <!-- Time table content goes here -->
    <div class="col-1 text-xs text-bold p-1">{{ day.day }}</div>
    <div class="col-11 text-sm">
      <div class="row flex-nowrap overflow-scroll time-table-day">
        <time-table-slot
          v-for="slot in day.slots"
          :key="slot.id"
          :time-slot="slot"
          @selectTeacherAndSubject="handleSelectTeacherAndSubject"
        />
      </div>
    </div>
  </div>
</template>

