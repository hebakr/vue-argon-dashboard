<template>
  <figure v-if="url">
    <img class="avatar avatar-xl me-3" :src="url" :alt="title" style="width: 100px" />
  </figure>
  <div class="initial" v-if="!url">
    {{ title.substring(0, 2).toUpperCase() }}
  </div>
</template>

<script setup>
defineProps(["url", "title"]);

// const initails = computed(() => $props.title.substring(2).toUpperCase());
</script>

<style scoped>
.initial {
  color: #fff;
  text-align: center;
  font-size: 48px;
  background-color: burlywood;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  padding-top: 10px;
}
</style>
