<script setup>
import ArgonInput from "@/components/ArgonInput.vue";

const model = defineModel();
const props = defineProps(["validator", "title"]);
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{ props.title }}</h4>
      <div class="row">
        <div class="col-12 col-md-6">
          <argon-input
            id="firstName"
            v-model="model.firstName"
            :validator="validator.firstName"
            >First name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="lastName"
            v-model="model.lastName"
            :validator="props.validator.lastName"
            >Last name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="email"
            type="email"
            v-model="model.email"
            :validator="props.validator.email"
            >Email</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="phone"
            type="phone"
            v-model="model.phone"
            :validator="props.validator.phone"
            >Phone</argon-input
          >
        </div>
      </div>
    </div>
  </div>
</template>
