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
import mitter from "@/mitt";
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
type Func = () => boolean;
export default {
  name: "ValidateForm",
  emits: ["submit-form"],
  setup(props, ctx) {
    let instance = null;
    let validateInputRef = null;
    let FuncArr: Array<Func> = [];
    const submitForm = () => {
      const result = FuncArr.map(func => func()).every(item => item);
      if (result) {
        validateInputRef.emptyInputVal();
      }
      ctx.emit("submit-form", { status: result });
    };
    mitter.on("validate-input-created", (res: Func) => {
      FuncArr.push(res);
    });
    onMounted(() => {
      instance = getCurrentInstance();
      validateInputRef = instance?.parent?.refs.validateInputRef;
    });
    onUnmounted(() => {
      mitter.off("validate-input-created");
      FuncArr = [];
    });
    return {
      submitForm
    };
  }
};
</script>

<style scoped></style>
