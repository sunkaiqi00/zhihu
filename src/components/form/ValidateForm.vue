<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import emitter from "@/mitt";
import { onUnmounted } from "vue";
type Func = () => boolean;
export default {
  name: "ValidateForm",
  emits: ["submit-form"],
  setup(props, ctx) {
    let FuncArr: Array<Func> = [];
    const submitForm = () => {
      const result = FuncArr.map(func => func()).every(item => item);
      ctx.emit("submit-form", result);
    };
    const mittCallback = res => {
      FuncArr.push(res);
    };
    emitter.on("validate-input-created", mittCallback);

    onUnmounted(() => {
      emitter.off("validate-input-created", mittCallback);
      FuncArr = [];
    });
    return {
      submitForm
    };
  }
};
</script>

<style scoped></style>
