<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="col-3">
    <div class="card p-3 py-3 text-center m-2">
      <router-link active-class="active" :to="{ name: routeName }">
        <i :class="iconClass" />
        {{ title }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
</style>