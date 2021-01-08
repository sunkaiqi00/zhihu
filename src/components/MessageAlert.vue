<template>
  <teleport to="#error-alert">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex align-items-center text-center mt-2"
      :class="classObj"
      v-if="isVisible"
    >
      <span class="text">{{ message }}</span>
      <!-- <span class="close" @click.prevent="hide">&times;</span> -->
    </div>
  </teleport>
</template>

<script lang="ts">
import { PropType, ref } from "vue";
import useDomCreate from "@/hooks/useDomCreate";
type messageType = "success" | "error" | "default";
export default {
  name: "MessageAlert",
  props: {
    message: String,
    type: {
      type: String as PropType<messageType>,
      default: "default"
    }
  },
  emits: ["onHide"],
  setup(props) {
    useDomCreate("error-alert");
    const isVisible = ref(true);
    const classObj = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-secondary": props.type === "default"
    };
    // const hide = () => {
    //   isVisible.value = false;
    //   context.emit("onHide", true);
    // };
    return {
      isVisible,
      classObj
      // hide
    };
  }
};
</script>
