<script setup>
import { computed, onMounted, ref } from "vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useAuthStore } from "@/store/auth";
import { minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useToast } from "vue-toastification";
const data = ref(null);
const accountCreated = ref(false);
const store = useAuthStore();
const formData = ref({});
const toast = useToast();
const urlParams = new URLSearchParams(window.location.search);
const token = computed(() => {
  return urlParams.get("token");
});

const teacherId = computed(() => {
  return urlParams.get("teacherId");
});

const handleSubmit = async () => {
  formData.value.token = token.value;
  formData.value.teacherId = teacherId.value;

  const response = await store.createTeacherAccount(formData.value);
  console.log("response", response);

  if (response.error) {
    toast.error(response.message);
    return;
  }

  toast.success("Account created sucessfully, you can now login");
  accountCreated.value = true;
};

const password = computed(() => formData.value.password);

const formValidations = {
  password: {
    required,
    minLengthValue: minLength(8),
  },
  confirmPassword: {
    required: required,
    sameAsPassword: sameAs(password),
  },
};

const v$ = useVuelidate(formValidations, formData);

onMounted(async () => {
  data.value = await store.findTeacher(teacherId.value);
  formData.value.email = data.value.teacher.email;
});
</script>
<template>
  <main class="main-content mt-0" v-if="data">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container" v-if="accountCreated">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h2 class="text-white mb-2 mt-5">
              Welcome {{ data.teacher.fullName }}!
            </h2>
            <p class="text-lead text-white">
              Your account has been created successfully, click the button below
              to go to the signin page
            </p>
            <p>
              <router-link class="btn btn-success" :to="{ name: 'signin' }"
                >Login</router-link
              >
            </p>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h2 class="text-white mb-2 mt-5">
              Welcome {{ data.teacher.fullName }}!
            </h2>
            <p class="text-lead text-white">
              By accepting and submitting this form, you agree to be part of
              <strong>{{ data.school.name }}</strong
              >, if you have an account with the {{ data.teacher.email }} email
              with another school, it will be transfered to
              <strong>{{ data.school.name }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="!accountCreated">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-5 col-lg-7 col-md-8 mx-auto">
          <div class="card z-index-0">
            <div class="card-body">
              <form role="form" @submit.prevent="handleSubmit">
                <argon-input
                  id="email"
                  type="email"
                  :disabled="true"
                  :modelValue="data.teacher.email"
                  placeholder="Email"
                  v-model="formData.email"
                  :validator="v$.email"
                  aria-label="Name"
                  >Email</argon-input
                >
                <argon-input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  v-model="formData.password"
                  :validator="v$.password"
                  >Password</argon-input
                >
                <argon-input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  aria-label="confirmPassword"
                  v-model="formData.confirmPassword"
                  :validator="v$.confirmPassword"
                  >Confirm password</argon-input
                >

                <div class="form-check">
                  <input
                    :id="id"
                    class="form-check-input"
                    type="checkbox"
                    :name="name"
                    v-model="formData.accept"
                  />
                  <label
                    :for="id"
                    class="custom-control-label"
                    :class="$attrs.class"
                  >
                    I accept the invitation and agree to
                    <a href="javascript:;" class="text-dark font-weight-bolder"
                      >Terms and Conditions</a
                    >
                  </label>
                </div>

                <div class="text-center">
                  <argon-button
                    :disabled="v$.$invalid || !formData.accept"
                    fullWidth
                    color="dark"
                    variant="gradient"
                    class="my-4 mb-2"
                    >Create account</argon-button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
