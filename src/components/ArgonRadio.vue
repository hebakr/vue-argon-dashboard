<script setup>
const model = defineModel();
defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
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
});
</script>
<template>
  <div class="form-check form-check-inline">
    <input
      :id="id"
      class="form-check-input"
      type="radio"
      v-model="model"
      :name="name"
      :value="value"
    />
    <label class="custom-control-label" :for="id">
      <slot />
    </label>
  </div>
</template>
