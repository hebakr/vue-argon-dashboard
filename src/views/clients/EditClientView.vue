<template>
  <div class="clients">
    <router-link to="/clients">Back to clients</router-link>
    <div v-if="store.loading">LOADING...</div>
    <ClientForm
      v-else
      @form-submitted="handleForm"
      :client="{ ...store.currentClient }"
    />
  </div>
</template>

<script setup>
// @ is an alias to /src
import { onMounted } from "vue";
import ClientForm from "@/components/ClientForm.vue";
import { useClientsStore } from "@/store/clients";
import { useRoute, useRouter } from "vue-router";

const store = useClientsStore();
const route = useRoute();
const router = useRouter();

onMounted(() => store.findById(route.params.id));
const handleForm = (data) => {
  store.update(route.params.id, data).then(() => router.push("/clients"));
};
</script>
