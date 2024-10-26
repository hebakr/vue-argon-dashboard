<script setup>
import { useTemplateStore } from "../../store/templateStore";
import Pagination from "../Pagination.vue";
import { RouterLink } from "vue-router";
import ActionsButton from "../ActionsButton.vue";
const store = useTemplateStore();

defineProps({
  title: String,
  modelName: String,
  loading: Boolean,
  data: {
    type: Array,
    required: true,
  },
  metadata: {
    type: Object,
    required: false,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["onDelete", "onEdit", "pageChanged", "onNew"]);
</script>
<template>
  <!-- <div class="table-responsive p-0" v-if="data?.length > 0"> -->
    <div class="p-0" v-if="data?.length > 0">
      <table class="table align-items-center justify-content-center mb-0">
      <thead>
        <th
          v-for="c in columns"
          :key="c.property"
          class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
        >
          {{ c.head }}
        </th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td v-for="c in columns" :key="c.property" class="px-4 text-xs py-3">
            <span class="text-sm font-weight-bold">
              <router-link :to="`${item.id}`" v-if="c.showAction">{{
                c.formatter ? c.formatter(item[c.property]) : item[c.property]
              }}</router-link>
              <span v-else>
                {{
                  c.formatter ? c.formatter(item[c.property]) : item[c.property]
                }}
              </span>
            </span>
          </td>
          <td :class="store.isRTL ? 'text-start' : 'text-end'" class="px-5">
            <actions-button
              :actions="[
                {
                  title: 'Edit',
                  handler: () => emit('onEdit', item),
                  icon: 'edit',
                },
                {
                  title: 'Delete',
                  handler: () => emit('onDelete', item),
                  icon: 'trash',
                },
              ]"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <pagination
      :metadata="metadata"
      @pageChanged="(page) => emit('pageChanged', page)"
    />
  </div>
  <div class="container text-center" v-else>
    No {{ title }} available,
    <a href="javascript:;" class="text-primary" @click="handleNew"
      >Add {{ modelName }}</a
    >
  </div>
</template>
