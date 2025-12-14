<script setup>
import PageLayout from "../components/PageLayout.vue";
import ConfigLink from "./components/configuration/ConfigLink.vue";
</script>
<template>
  <page-layout title="Configurations">
    <div class="container mt-4">
      <div class="row">
        <div class="row">
          <ConfigLink
            title="Fee Categories"
            route-name="fee-categories"
            icon-class="fa fa-money-bill-wave text-info"
          />

          <ConfigLink
            title="Subjects"
            route-name="subjects"
            icon-class="fa fa-book-open text-primary"
          />
          <ConfigLink
            title="Grades"
            route-name="grades"
            icon-class="fa fa-graduation-cap text-success"
          />
          <ConfigLink
            title="Classes"
            route-name="classes"
            icon-class="fa fa-chalkboard-teacher text-info"
          />
          <ConfigLink
            title="Class Rooms"
            route-name="class-rooms"
            icon-class="fa fa-building text-warning"
          />
          <ConfigLink
            title="Time table profiles"
            route-name="time-table-profiles"
            icon-class="fa fa-calendar text-primary"
          />
        </div>
      </div>

      <hr />
      <router-view />
    </div>
  </page-layout>
</template>
