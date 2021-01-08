<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <span
              aria-hidden="true"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click.stop="onCancel"
            >
              &times;
            </span>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.stop="onCancel"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import useDomCreate from "@/hooks/useDomCreate";
export default {
  name: "Modal",
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["modalOnConfirm", "modalOnCancel"],
  setup(props, context) {
    useDomCreate("modal");
    const onCancel = () => {
      context.emit("modalOnCancel");
    };
    const onConfirm = () => {
      context.emit("modalOnConfirm");
    };

    return {
      onCancel,
      onConfirm
    };
  }
};
</script>

<style scoped>
.close {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
