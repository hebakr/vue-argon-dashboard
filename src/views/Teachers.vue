
<script setup>
import { onMounted, ref } from "vue";
import CrudList from "@/components/CrudList.vue";
import { useGradesStore } from "../store/grades";
import { useRoute } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
import { useSubjectsStore } from "../store/subjects";
import { required } from "@vuelidate/validators";

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
  console.log(item);
};

const handleSubmit = async (data) => {
  submitting.value = true;
  console.log(data);

  // await store.saveRoom(data);
  // submitting.value = false;
  // formOpen.value = false;
  // store.fetchRooms(params.schoolId);
};

const gradesStore = useGradesStore();
const subjectsStore = useSubjectsStore();
onMounted(() => gradesStore.findAll(params.schoolId));
onMounted(() => subjectsStore.findAll(params.schoolId));

const isInvalid = (k, validator) => {
  return validator[k].$dirty && validator[k].$errors.length;
};

const isValid = (k, validator) => {
  return validator[k].$dirty && !validator[k].$invalid;
};
</script>

<template>
  <crud-list
    actionTitle="Add Teacher"
    title="Teachers"
    :columns="columns"
    :data="[]"
    :initialFormData="{ schoolId: params.schoolId }"
    :submitting="submitting"
    :formValidationRules="{ firstName: { required }, lastName: { required } }"
    :formOpen="formOpen"
    :modelName="'Teacher'"
    @onDelete="handleDelete"
    @onSubmit="handleSubmit"
    formSize="xl"
    @onFormOpen="() => (formOpen = true)"
  >
    <template #form="{ formData, validator }">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Teacher information</h3>
          <p class="card-text"></p>
          <div class="row">
            <div class="col-12 col-md-6">
              <argon-input
                @blur="validator.firstName.$touch()"
                id="firstName"
                v-model="formData.firstName"
                :error="isInvalid('firstName', validator)"
                :success="isValid('firstName', validator)"
                >First name</argon-input
              >
              <!-- <div
                v-for="error in validator.firstName.$errors"
                :key="error.$uid"
              >
                <p>{{ error.$message }}</p>
              </div> -->
            </div>
            <div class="col-12 col-md-6">
              <argon-input
                id="lastName"
                v-model="formData.lastName"
                @blur="validator.lastName.$touch()"
                :error="isInvalid('lastName', validator)"
                :success="isValid('lastName', validator)"
                >Last name</argon-input
              >
            </div>
            <div class="col-12 col-md-6">
              <argon-input id="email">Email</argon-input>
            </div>
            <div class="col-12 col-md-6">
              <argon-input id="phone">Phone</argon-input>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Grades</label
                >
                <select class="form-control" multiple>
                  <option
                    v-for="g in gradesStore.list"
                    :key="g.id"
                    :value="g.id"
                  >
                    {{ g.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Subjects</label
                >
                <select class="form-control" multiple v-model="formData.name">
                  <option
                    v-for="g in subjectsStore.list"
                    :key="g.id"
                    :value="g.id"
                  >
                    {{ g.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Account details</h3>
          <hr />
          <p class="card-text">
            Add the username/email and password to create teacher account
          </p>
          <div class="row">
            <div class="col-12 col-md-6">
              <argon-input id="firstName">Username/Email</argon-input>
            </div>
            <div class="col-12 col-md-6">
              <argon-input id="lastName" type="password">Password</argon-input>
            </div>
          </div>
        </div>
      </div>
    </template>
  </crud-list>
</template>

