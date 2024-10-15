
<script setup>
// const data = [1, 2, 3, 4, 5, 5, 6, 96, 86, 76, 66, 56, 46, 36, 26, 16, 17, 18];
import { onMounted } from "vue";
import { useBrandsStore } from "@/store/brands";
import { useTemplateStore } from "@/store/templateStore";
import PageLayout from "../components/PageLayout.vue";

const store = useBrandsStore();
const templateStore = useTemplateStore();
templateStore.showSidenav = false;
templateStore.hideConfigButton = true;

onMounted(() => store.fetchBrands());
</script>

<template>
  <page-layout title="">
    <div class="container">
      <h2>Welcome!</h2>
      <p>
        To get started, select your organization below to manage your school.
      </p>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-6 col-xl-3 col-lg-4"
        v-for="x in store.brands"
        :key="x.id"
      >
        <div class="card">
          <div class="card-body text-center">
            <p>
              <span class="fa fa-sitemap fa-5x"></span>
            </p>
            <div>{{ x.name }} ({{ x.schoolsCount }})</div>
            <router-link
              class="btn btn-success"
              :to="{ name: 'BrandDetails', params: { brandId: x.id } }"
            >
              Manage schools
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>


