<template>
  <page-layout title="Clients">
    <template v-slot:actions>
      <a href="#" class="btn btn-primary" @click="() => (open = !open)"
        >Add Client</a
      >
    </template>
    <clients-list />
    <app-dialog
      title="Create new client"
      :open="open"
      @cancel="() => (open = false)"
      submit-title="Save client"
    >
      <h3>Dialog contents will go here!</h3>
    </app-dialog>
  </page-layout>
</template>

<script setup>
import PageLayout from "@/views/components/PageLayout.vue";
import ClientsList from "@/components/ClientsList.vue";
import AppDialog from "@/components/AppDialog.vue";
import { ref } from "vue";

const open = ref(false);
</script>
