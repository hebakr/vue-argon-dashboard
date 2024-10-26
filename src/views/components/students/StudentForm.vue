<script setup>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonRadio from "@/components/ArgonRadio.vue";
import ParentForm from "./ParentForm.vue";

import { ref } from "vue";

const model = defineModel();
const props = defineProps(["validator"]);

const hasSibling = ref('no')
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">Student information</h3>
      <div class="row">
        <div class="col-12 col-md-6">
          <argon-input
            id="firstName"
            v-model="model.student.firstName"
            :validator="validator.student.firstName"
            >First name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="lastName"
            v-model="model.student.lastName"
            :validator="validator.student.lastName"
            >Last name</argon-input
          >
        </div>
        <div class="col-12 col-md-6">
          <argon-input
            id="email"
            type="email"
            v-model="model.student.email"
            :validator="props.validator.student.email"
            >Email</argon-input
          >
        </div>

        <div class="col-12 col-md-6">
          <div class="form-group">
            <label for="" class="form-control-label">Gender</label>
            <select class="form-control" v-model="model.student.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <p>Is Sibiling studying in the same school?</p>
    <argon-radio
      id="sibling-yes"
      name="g1"
      value="yes"
      v-model="hasSibling"
    >
      Yes</argon-radio
    >
    <argon-radio id="sibling-no" name="g1" value="no" v-model="hasSibling"
      >No</argon-radio
    >
  </div>
  <div v-if="hasSibling == 'yes'">show form to select the sibling student</div>
  <div v-else>
    <parent-form title="Father information" v-model="model.father" :validator="validator.father"></parent-form>
    <parent-form title="Mother information" v-model="model.mother" :validator="validator.mother"></parent-form>
    <div class="container-fluid">
    <p><strong>Gardian</strong></p>
    <argon-radio
      id="sibling-yes"
      name="g2"
      value="father"
      v-model="model.gardianParent"
    >
      Father</argon-radio
    >
    <argon-radio
      id="sibling-yes"
      name="g2"
      value="mother"
      v-model="model.gardianParent"
    >
      Mother</argon-radio
    >
    <argon-radio
      id="sibling-yes"
      name="g2"
      value="other"
      v-model="model.gardianParent"
    >
      Other</argon-radio
    >
    
  </div>
    <parent-form v-if="model.gardianParent == 'other'" title="Gardian information" v-model="model.gardian" :validator="validator.gardian"></parent-form>
  </div>
</template>
