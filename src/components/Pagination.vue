<script setup>
const props = defineProps({
  metadata: {
    type: Object,
  },
});

const imit = defineEmits(["pageChanged"]);
const gotoPage = (page) => {
  if (page === props.metadata?.currentPage || page > props.metadata.totalPages)
    return;

  imit("pageChanged", page);
};
</script>
<template>
  <nav v-if="metadata && metadata.totalPages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="metadata.prevPage ? '' : 'disabled'">
        <a
          class="page-link"
          href="javascript:;"
          tabindex="-1"
          @click="gotoPage(metadata.currentPage - 1)"
        >
          <i class="fa fa-angle-left"></i>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="index in metadata.totalPages"
        :key="index"
        :class="index === metadata.currentPage ? 'active' : ''"
      >
        <a class="page-link" href="javascript:;" @click="gotoPage(index)">{{
          index
        }}</a>
      </li>
      <li class="page-item" :class="metadata.nextPage ? '' : 'disabled'">
        <a
          class="page-link"
          href="javascript:;"
          @click="gotoPage(metadata.currentPage + 1)"
        >
          <i class="fa fa-angle-right"></i>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
