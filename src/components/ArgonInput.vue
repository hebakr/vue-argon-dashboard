<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:modelValue", "blur"]);

const props = defineProps({
  size: {
    type: String,
    default: "default",
  },
  icon: {
    type: String,
    default: "",
  },
  iconDir: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  validator: {
    type: Object,
    default: null,
  },
});

const error = computed(
  () => props.validator?.$dirty && props.validator?.$errors.length
);
const success = computed(
  () => props.validator?.$dirty && props.validator?.$errors.length === 0
);

const getClasses = (size, success, error) => {
  let sizeValue, isValidValue;

  sizeValue = size ? `form-control-${size}` : null;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
};
const getIcon = (icon) => (icon ? icon : null);
const hasIcon = (icon) => (icon ? "input-group" : null);
</script>
<template>
  <div class="form-group">
    <label :for="id"><slot /></label>
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :id="id"
        :type="type"
        class="form-control"
        :class="getClasses(size, success, error)"
        :name="name"
        :disabled="disabled"
        :value="modelValue"
        :placeholder="placeholder"
        :isRequired="isRequired"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="validator?.$validate()"
      />
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <div class="invalid-feedback error-message">
        <div v-for="error in validator?.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .error-message {
    font-size: 0.75em;
  }
</style>
