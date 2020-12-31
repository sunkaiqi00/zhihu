<template>
  <div class="validate-input-container pb-3">
    <input
      type="email"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="modleValue"
      @input="inputValue"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { reactive, PropType, onMounted } from "vue";
import { RuleProp } from "@/typeings/interface";
import { emailRegExp } from "@/utils/regExp";
import emitter from "@/mitt";
type RulesProp = RuleProp[];
export default {
  name: "ValidateInpute",
  props: {
    rules: Array as PropType<RulesProp>,
    modleValue: String
  },
  inheritAttrs: false,
  emits: ["empty-input"],
  setup(props, ctx) {
    const inputRef = reactive({
      val: props.modleValue || "",
      error: false,
      message: ""
    });
    const inputValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      ctx.emit("update:modleValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailRegExp.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    const emptyInputVal = () => {
      ctx.emit("empty-input");
    };
    onMounted(() => {
      emitter.emit("validate-input-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      inputValue,
      emptyInputVal
    };
  }
};
</script>

<style scoped></style>
