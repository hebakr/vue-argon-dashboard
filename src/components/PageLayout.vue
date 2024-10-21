<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header pb-0 d-flex justify-content-between">
            <h3>{{ title }}</h3>
            <div><slot name="top-center" /></div>
            <div>
              <slot name="actions" />
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2" style="min-height: 400px">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["title"]);
</script>
