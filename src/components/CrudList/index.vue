<script setup>
import { ref } from "vue";
import PageLayout from "../PageLayout.vue";
import CrudTable from "./CrudTable.vue";
import AppDialog from "@/components/AppDialog.vue";
import { useVuelidate } from "@vuelidate/core";
import { useTemplateStore } from "@/store/templateStore";

const store = useTemplateStore();

const open = ref(false);
const formData = ref(null);

const props = defineProps({
  title: String,
  actionTitle: String,
  modelName: String,
  submitting: Boolean,
  loading: Boolean,
  formOpen: Boolean,
  data: {
    type: Array,
    required: true,
  },
  metadata: {
    type: Object,
    required: false,
  },
  columns: {
    type: Array,
    required: true,
  },
  formSize: {
    type: String,
    default: "default",
  },
  initialFormData: Object,
  formValidationRules: Object,
});

const v$ = useVuelidate(props.formValidationRules, formData);

const handleNew = () => {
  emit("onFormOpen");
  open.value = true;
  formData.value = { ...props.initialFormData };
  v$.value.$reset();
};

const handleEdit = async (item) => {
  await emit("onFormOpen", item);
  open.value = true;
  formData.value = { ...props.initialFormData };
  v$.value.$validate();
};

const handleDelete = (item) => {
  if (confirm("Are you sure?")) emit("onDelete", item);
};

const handleClose = () => {
  open.value = false;
  formData.value = null;
};

const handleSubmit = async () => {
  await v$.value.$validate();

  emit("onSubmit", formData.value);
};

const viewType = ref("table");

const emit = defineEmits([
  "onDelete",
  "onEdit",
  "onSubmit",
  "onFormOpen",
  "pageChanged",
]);
</script>
<template>
  <page-layout :title="props.title">
    <template #top-center>
      <div class="btn-group" role="group">
        <input
          type="radio"
          class="btn-check"
          v-model="viewType"
          value="table"
          name="btnradio"
          id="btnradio-table"
          autocomplete="off"
          :checked="viewType == 'table'"
        />
        <label
          class="btn btn-outline-default"
          :class="viewType == 'table' ? 'active' : ''"
          for="btnradio-table"
          title="Table view"
        >
          <i class="fa fa-table"></i
        ></label>

        <input
          type="radio"
          class="btn-check"
          value="list"
          v-model="viewType"
          name="btnradio"
          id="btnradio-grid"
          autocomplete="off"
          :checked="viewType == 'list'"
        />
        <label
          class="btn btn-outline-default"
          :class="viewType === 'list' ? 'active' : ''"
          for="btnradio-grid"
          title="Grid view"
          ><i class="fa fa-qrcode"></i
        ></label>
      </div>
    </template>
    <template #actions>
      <button class="btn btn-default" @click="handleNew">
        <i class="fa fa-plus"></i>
        <span class="d-none d-md-inline-block mx-1">{{
          props.actionTitle
        }}</span>
      </button>
    </template>
    <div class="loading-data d-flex justify-content-center" v-if="loading">
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <crud-table
      v-else
      :title="title"
      :modelName="modelName"
      :loading="loading"
      :data="data"
      :metadata="metadata"
      :columns="columns"
      @onNew="handleNew"
      @onDelete="handleDelete"
      @onEdit="handleEdit"
      @pageChanged="(page) => emit('pageChanged', page)"
    />
  </page-layout>
  <app-dialog
    :title="`${props.modelName} details`"
    :open="open && props.formOpen"
    v-if="open && formData"
    submit-title="Save"
    :loading="props.submitting"
    :submitDisabled="v$.$invalid"
    :formSize="props.formSize"
    @submitPressed="handleSubmit"
    @cancel="handleClose"
    :isRTL="store.isRTL"
  >
    <slot name="form" :formData="formData" :validator="v$"
      >Add form here!{{ formData }}</slot
    >
  </app-dialog>
</template>

<style scoped>
.btn-outline-default.active {
  background-color: lightblue;
}

.loading-data {
  margin: 50px auto;
}
</style>
