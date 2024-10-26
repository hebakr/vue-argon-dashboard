<script setup>
import { ref } from "vue";
import { onClickOutside } from '@vueuse/core'

defineProps({
  actions: {
    type: Array,
    required: true,
  },
});
const target = ref(null)

const open = ref(false);
onClickOutside(target, () => open.value = false)


const handleAction = (action) => {
  action.handler();
  open.value = false;
};
</script>
<template>
  <div class="dropdown" ref="target">
    <a
      class="btn btn-default btn-sm rounded-circle"
      href="javascript:;"
      @click="open = !open"
      aria-expanded="false"
    >

      <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
    </a>
    <ul class="dropdown-menu" :class="open ? 'show' : ''">
      <slot />
      <li v-for="action in actions" :key="action.title">
        <a
          class="dropdown-item"
          href="javascript:;"
          @click="() => handleAction(action)"
        >
          <i :class="`fa fa-${action.icon}`" /> {{ action.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.btn-sm {
  padding: 0.625rem 1.25rem;
}
</style>
