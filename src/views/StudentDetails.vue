
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStudentsStore } from "@/store/students";
import ArgonInput from "../components/ArgonInput.vue";
import { useRoute } from "vue-router";
import AppDialog from "../components/AppDialog.vue";
import AppSelect from "@/components/AppSelect.vue";
import { useGradesStore } from "@/store/grades";
import { useClassesStore } from "@/store/classes";
import { useSchoolsStore } from "@/store/schools";

const schoolsStore = useSchoolsStore();
const currentYearId = 1;

const { params } = useRoute();
const lastEnrollment = computed(() => {
  if (data.value.enrollments && data.value.enrollments.length > 0) {
    return data.value.enrollments[data.value.enrollments.length - 1];
  }
  return null;
});

const data = ref({});
const formData = ref({
  gradeId: "",
  academicClassId: "",
});
const handleSubmit = async () => {
  await store.enrollStudent(
    params.schoolId,
    params.id,
    formData.value.gradeId,
    formData.value.academicClassId,
    schoolsStore.currentYear?.id || 0
  );
  handleClose();
  // refresh student data
  data.value = await store.findById(
    params.schoolId,
    params.id,
    schoolsStore.currentYear?.id || 0
  );
};
const handleEnrollBtn = () => {
  openEnrollModal.value = true;
};
const handleClose = () => {
  openEnrollModal.value = false;
};
const openEnrollModal = ref(false);
const store = useStudentsStore();
onMounted(async () => {
  data.value = await store.findById(params.schoolId, params.id, currentYearId);
});

const gradesStore = useGradesStore();
const classesStore = useClassesStore();

onMounted(() => gradesStore.findAll(params.schoolId));

const gradeOptions = computed(() =>
  gradesStore.list.map((g) => {
    return { id: g.id, title: g.name };
  })
);

const classOptions = computed(() =>
  classesStore.list.map((item) => {
    return { id: item.id, title: item.title };
  })
);

const handleGradeChange = (e) => {
  classesStore.findAll(params.schoolId, 1, "", { gradeId: e.target.value });
};
</script>

<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      ></div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/habiba.png"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{{ data.fullName }}</h5>
              </div>
            </div>
            <div
              class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Student Profile</p>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >First name</label
                  >
                  <argon-input
                    type="text"
                    :model-value="data.firstName"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Last name</label
                  >
                  <argon-input
                    type="text"
                    :model-value="data.lastName"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Relegion</label
                  >
                  <argon-input
                    type="text"
                    :model-value="data.relegion"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Gender</label
                  >
                  <argon-input
                    type="text"
                    :model-value="data.gender"
                    disabled
                  />
                </div>
              </div>

              <h3>Parents details</h3>
              <div class="row">
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header pb-0">
                      <strong>Mother</strong>
                    </div>
                    <div class="card-body">
                      <p class="mb-1 text-sm">
                        <strong>Name:</strong>
                        {{ data.mother?.fullName || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Phone:</strong>
                        {{ data.mother?.phone || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Email:</strong>
                        {{ data.mother?.email || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header pb-0">
                      <strong>Father</strong>
                    </div>
                    <div class="card-body">
                      <p class="mb-1 text-sm">
                        <strong>Name:</strong>
                        {{ data.father?.fullName || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Phone:</strong>
                        {{ data.father?.phone || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Email:</strong>
                        {{ data.father?.email || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-header pb-0">
                      <strong>Guardian </strong>
                    </div>
                    <div class="card-body">
                      <p class="mb-1 text-sm">
                        <strong>Name:</strong>
                        {{ data.gardian?.fullName || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Phone:</strong>
                        {{ data.gardian?.phone || "N/A" }}
                      </p>
                      <p class="mb-1 text-sm">
                        <strong>Email:</strong>
                        {{ data.gardian?.email || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile p-3">
            <h3>Enrollment</h3>
            <div v-if="lastEnrollment">
              <p class="mb-1 text-sm">
                <strong>Class:</strong> {{ lastEnrollment.academicClass.title }}
              </p>

              <p class="mb-1 text-sm">
                <strong>School Year:</strong>
                {{ lastEnrollment.academicYear.title }}
              </p>
              <p>
                <strong>Grade:</strong>
                {{ lastEnrollment.academicClass.gradeName }}
              </p>
              <hr />
            </div>
            <div v-else>
              <p>No enrollment found for this student.</p>
              <button class="btn btn-primary btn-sm" @click="handleEnrollBtn">
                Enroll Now
              </button>
              <!-- show modal to enroll student -->
              <app-dialog
                :title="`Enroll ${data.fullName}`"
                :open="openEnrollModal"
                submit-title="Submit"
                :submitDisabled="
                  formData.gradeId === '' || formData.academicClassId === ''
                "
                @submitPressed="handleSubmit"
                @cancel="handleClose"
              >
                <app-select
                  id="gradeId"
                  name="gradeId"
                  v-model="formData.gradeId"
                  :options="gradeOptions"
                  @onChange="handleGradeChange"
                  >Grade</app-select
                >

                <app-select
                  id="classsId"
                  name="classsId"
                  v-model="formData.academicClassId"
                  :options="classOptions"
                  >Class</app-select
                >
              </app-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
