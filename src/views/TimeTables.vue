  <script setup>
import PageLayout from "@/components/PageLayout.vue";
import AppSelect from "@/components/AppSelect.vue";
import AppDialog from "../components/AppDialog.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TimeTableDay from "@/views/components/time-table/TimeTableDay.vue";
import { useClassesStore } from "@/store/classes";
import { useSubjectsStore } from "@/store/subjects";
import { useTeachersStore } from "@/store/teachers";
import { useSchoolsStore } from "@/store/schools";
import { useTimeTablesStore } from "@/store/timeTablesStore";
import { useToast } from "vue-toastification";

const classesStore = useClassesStore();
const subjectsStore = useSubjectsStore();
const teachersStore = useTeachersStore();
const schoolsStore = useSchoolsStore();
const timeTablesStore = useTimeTablesStore();
const toast = useToast();

const { params } = useRoute();
onMounted(() => {
  teachersStore.findAll(params.schoolId, 1, "", {}, 1000);
  classesStore.findAll(params.schoolId);
  subjectsStore.findAll(params.schoolId);
});

const handleSubmit = async () => {
  const response = await timeTablesStore.assignTeacherAndSubject(
    params.schoolId,
    selectedTimeSlot.value,
    modalFormData.value.subjectId,
    modalFormData.value.teacherId
  );

  if (response.error) {
    toast.error(response.error || "An error occurred while saving.");
    return;
  }
  openModal.value = false;
  // refresh time table
  await handleChange();
};

const handleClose = () => {
  openModal.value = false;
};
const formData = ref({
  academicClassId: "",
});
const openModal = ref(false);
const selectedTimeSlot = ref(null);

const handleChange = async () => {
  await timeTablesStore.fetchTimeTable(
    params.schoolId,
    formData.value.academicClassId,
    schoolsStore.currentYear?.id || 0
  );
};

const classOptions = computed(() =>
  classesStore.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const subjectOptions = computed(() =>
  subjectsStore.list.map((item) => {
    return { id: item.id, title: item.name };
  })
);

const teacherOptions = computed(() =>
  teachersStore.list.collection.map((item) => {
    return { id: item.id, title: item.fullName };
  })
);

const modalFormData = ref({
  subjectId: "",
  teacherId: "",
});

const handleSelectTeacherAndSubject = (timeSlot) => {
  openModal.value = true;
  selectedTimeSlot.value = timeSlot;
  modalFormData.value.subjectId = timeSlot.subject?.id || "";
  modalFormData.value.teacherId = timeSlot.teacher?.id || "";
};

const headers = computed(() => {
  return (
    timeTablesStore.timeTable[0]?.slots.map((slot) => {
      return {
        text: `${slot.startTime} - ${slot.endTime}`,
        periodNo: slot.periodNo,
        value: slot.id,
      };
    }) || []
  );
});
</script>

<template>
  <page-layout title="Time Tables">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12">
          <app-select
            id="classsId"
            name="classsId"
            v-model="formData.academicClassId"
            @onChange="handleChange"
            :options="classOptions"
            prompt="Select Class"
          ></app-select>
        </div>
      </div>
      <hr />
      <div v-if="formData.academicClassId">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-11">
            <div class="row flex-nowrap overflow-auto time-table-day">
              <div
                v-for="header in headers"
                style="min-width: 158px"
                :key="header.id"
                class="col text-center text-sm"
              >
                <div class="card w-100 mb-2">
                  <div class="card-body">
                    <p class="card-title text-sm text-bold text-center">
                      Period {{ header.periodNo }}
                    </p>
                    <p
                      class="card-text text-xs text-secondary mb-2 text-default"
                    >
                      {{ header.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <time-table-day
          v-for="day in timeTablesStore.timeTable"
          :key="day.day"
          :day="day"
          @selectTeacherAndSubject="handleSelectTeacherAndSubject"
        />
      </div>
    </div>
    <app-dialog
      title="Select Teacher and Subject"
      :open="openModal"
      form-size="lg"
      submit-title="Save"
      :submitDisabled="
        modalFormData.subjectId === '' && modalFormData.teacherId === ''
      "
      @submitPressed="handleSubmit"
      @cancel="handleClose"
    >
      <argon-alert color="info" class="mb-3 text-sm" icon="fa fa-info-circle">
        Please select the subject and teacher for the selected time slot.
      </argon-alert>
      <div class="d-flex justify-content-between mb-3 text-sm">
        <div>Period: {{ selectedTimeSlot?.periodNo }}</div>
        <div>Class: {{ formData.academicClassId }}</div>
        <div>Day: {{ selectedTimeSlot?.dayOfWeek }}</div>
        <div>
          {{ selectedTimeSlot?.startTime }}
          - {{ selectedTimeSlot?.endTime }}
        </div>
      </div>

      <app-select
        id="subjectId"
        name="subjectId"
        v-model="modalFormData.subjectId"
        :options="subjectOptions"
        >Select Subject</app-select
      >
      <app-select
        id="teacherId"
        name="teacherId"
        v-model="modalFormData.teacherId"
        :options="teacherOptions"
        >Select Teacher</app-select
      >
    </app-dialog>
  </page-layout>
</template>


