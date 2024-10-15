<script setup>
import { ref } from "vue";
import PageLayout from "./PageLayout.vue";
import AppDialog from "@/components/AppDialog.vue";

const open = ref(false);
const formData = ref(null);

const props = defineProps({
  title: String,
  actionTitle: String,
  modelName: String,
  submitting: Boolean,
  formOpen: Boolean,
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  initialFormData: Object,
});

const handleNew = () => {
  emit("onFormOpen");
  open.value = true;
  formData.value = { ...props.initialFormData };
};

const handleEdit = (item) => {
  emit("onFormOpen");
  open.value = true;
  formData.value = { ...item };
};

const handleDelete = (item) => {
  if (confirm("Are you sure?")) emit("onDelete", item);
};

const handleClose = () => {
  open.value = false;
  formData.value = null;
};

const handleSubmit = () => {
  emit("onSubmit", formData.value);
};

const emit = defineEmits(["onDelete", "onSubmit", "onFormOpen"]);
</script>
<template>
  <page-layout :title="props.title">
    <template v-slot:actions>
      <button class="btn btn-default" @click="handleNew">
        <i class="fa fa-plus"></i>
        {{ props.actionTitle }}
      </button>
    </template>

    <div class="table-responsive p-0" v-if="data.length > 0">
      <table class="table align-items-center justify-content-center mb-0">
        <thead>
          <th v-for="c in props.columns" :key="c.property">{{ c.head }}</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td v-for="c in props.columns" :key="c.property" class="px-4 py-3">
              <span class="text-sm font-weight-bold">{{
                c.formatter ? c.formatter(item[c.property]) : item[c.property]
              }}</span>
            </td>
            <td class="px-4 py-2 text-end">
              <a class="btn btn-default btn-xs" @click="() => handleEdit(item)">
                <i class="fa fa-edit"></i>
              </a>
              <a
                class="btn btn-danger btn-xs"
                @click="() => handleDelete(item)"
              >
                <i class="fa fa-trash"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container text-center" v-else>
      No {{ title }} available,
      <a href="javascript:;" class="text-primary" @click="handleNew"
        >Add {{ modelName }}</a
      >
    </div>
  </page-layout>
  <app-dialog
    :title="`${props.modelName} details`"
    :open="open && props.formOpen"
    v-if="formData"
    submit-title="Save"
    :loading="props.submitting"
    :submitDisabled="false"
    @submitPressed="handleSubmit"
    @cancel="handleClose"
  >
    <slot name="form" :formData="formData">Add form here!{{ formData }}</slot>
  </app-dialog>
</template>
