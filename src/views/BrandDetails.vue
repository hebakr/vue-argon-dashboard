
<script setup>
import { onMounted, onBeforeMount } from "vue";
import { useTemplateStore } from "@/store/templateStore";
const templateStore = useTemplateStore();
import { useBrandsStore } from "@/store/brands";
import PageLayout from "../components/PageLayout.vue";
import { useRoute } from "vue-router";

onBeforeMount(() => {
  templateStore.showNavbar = false;
  templateStore.showSidenav = false;
  templateStore.showFooter = false;
  templateStore.hideConfigButton = true;
});

const store = useBrandsStore();
const route = useRoute();
onMounted(() => store.fetchBrand(route.params.brandId));
</script>

<template>
  <div class="container">
    <page-layout :title="store.brand?.name">
      <p class="container">
        Select a school to manage your students, teachers and school related
        data.
      </p>
      <div class="row">
        <div
          class="col-12 col-md-6 col-xl-3 col-lg-4"
          v-for="school in store.brand?.schools"
          :key="school.id"
        >
          <div class="card">
            <div class="card-body text-center">
              <p>
                <i class="fas fa-school fa-5x"></i>
              </p>
              <div>{{ school.name }}</div>
              <router-link class="btn btn-success" :to="`/app/${school.id}`">
                Manage school
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </page-layout>
  </div>
</template>


