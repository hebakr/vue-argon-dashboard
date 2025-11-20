<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
});
const model = defineModel();

</script>
<template>
  <div class="form-check form-switch ps-0">
    <input
      :id="id"
      class="form-check-input ms-0"
      :class="inputClass"
      type="checkbox"
      v-model="model"
      :name="name"
      :checked="checked"
    />
    <label class="form-check-label" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>
