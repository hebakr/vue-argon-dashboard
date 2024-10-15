<script setup>
const emit = defineEmits("cancel", "submitPressed");
defineProps({
  title: {
    type: String,
    required: true,
  },
  submitTitle: {
    type: String,
    required: false,
  },
  cancelTitle: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  submitDisabled: {
    type: Boolean,
    required: false,
  },
});

const handleClose = () => {
  emit("cancel");
};

const handleSubmit = () => {
  emit("submitPressed");
};
</script>

<template>
  <Teleport to="body" v-if="open">
    <!-- Modal -->
    <div
      class="modal fade show app-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <h3 class="modal-title fs-6" id="exampleModalLabel">
              {{ title }}
            </h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="handleClose"
            >
              <i class="fa fa-times"></i> {{ cancelTitle || "Close" }}
            </button>
            <button
              class="btn btn-success"
              type="button"
              disabled
              v-if="loading"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
            <button
              v-if="!loading"
              type="button"
              :disabled="submitDisabled"
              class="btn btn-success"
              @click="handleSubmit"
            >
              <i class="fa fa-save"></i>
              {{ submitTitle || "Save changes" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show app-modal-backdrop"></div>
  </Teleport>
</template>


<style scoped>
.app-modal {
  display: block;
  z-index: 10002;
}

.app-modal-backdrop {
  z-index: 10001;
}
</style>