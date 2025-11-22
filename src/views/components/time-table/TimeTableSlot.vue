
<script setup>
defineProps({
  timeSlot: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits("selectTeacherAndSubject");

const handleClick = (timeSlot) => {
  emit("selectTeacherAndSubject", timeSlot);
};
</script>

<template>
  <div
    class="col col-md cursor-pointer"
    style="min-width: 158px"
    @click="handleClick(timeSlot)"
  >
    <div
      class="card w-100 mb-2 h-100"
      :style="{ backgroundColor: timeSlot.subject?.colorCode || '#f8f9fa' }"
    >
      <div class="card-body">
        <p class="card-text text-xs text-secondary mb-2 text-default">
          <!-- Placeholder for subject/teacher info -->
          <i class="fa fa-book me-1" aria-hidden="true"></i>
          {{ timeSlot.subject?.name || "N/A" }}
        </p>
        <div class="d-flex w-100" v-if="timeSlot.teacher?.fullName">
          <div>
            <i class="fa fa-teacher" />
            <img
              src="../../../assets/img/team-3.jpg"
              class="avatar avatar-xs me-1"
              alt="user1"
            />
          </div>
          <div
            class="d-flex flex-column justify-content-center overflow-hidden"
          >
            <p class="mb-0 text-xs text-nowrap">
              {{ timeSlot.teacher?.fullName || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

