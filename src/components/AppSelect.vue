<script setup>
import { computed } from "vue";

const emit = defineEmits("onChange");
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
  },
  id: {
    type: String,
    default: "",
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

const model = defineModel();

const success = computed(
  () => props.validator?.$dirty && props.validator?.$errors.length === 0
);

const getClasses = (success, error) => {
  let isValidValue;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${isValidValue}`;
};
</script>
<template>
  <div class="form-group">
    <label :for="id"><slot /></label>

    <select
      class="form-select"
      v-model="model"
      @change="(e) => emit('onChange', e)"
      :class="getClasses(success, error)"
      @blur="validator?.$validate()"
    >
      <option value="">Select</option>
      <option v-for="opt in options" :key="opt.id" :value="opt.id">
        {{ opt.title }}
      </option>
    </select>

    <div class="invalid-feedback error-message">
      <div v-for="error in validator?.$errors" :key="error.$uid">
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.error-message {
  font-size: 0.75em;
}
</style>
