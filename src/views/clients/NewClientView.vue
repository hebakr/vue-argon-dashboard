<template>
  <div class="clients">
    <router-link to="/clients">Back to clients</router-link>
    <ClientForm @form-submitted="handleForm" />
  </div>
</template>

<script setup>
// @ is an alias to /src
import ClientForm from "@/components/ClientForm.vue";
import { useClientsStore } from "@/store/clients";
import { useRouter } from "vue-router";

const store = useClientsStore();
const router = useRouter();

const handleForm = (data) => {
  store.create(data).then(() => router.push("/clients"));
};
</script>
