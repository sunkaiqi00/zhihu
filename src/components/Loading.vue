<template>
  <teleport to="#loading">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ backgroundColor: backgroundColor || '' }"
    >
      <div class="loading-content text-primary text-center">
        <div class="spinner-border text-primary mb-2" role="status">
          <span class="sr-only" :style="{ color: textColor }"></span>
        </div>
        <div v-if="text" :style="{ color: textColor }">{{ text }}</div>
      </div>
    </div>
  </teleport>
</template>

<script>
import useCreateDom from "@/hooks/useDomCreate";
export default {
  name: "Loading",
  props: {
    text: {
      type: String,
      default: ""
    },
    textColor: String,
    backgroundColor: String
  },
  setup() {
    useCreateDom("loading");
  }
};
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
