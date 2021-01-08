<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag === 'input'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="modleValue"
      @input="inputValue"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else
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
type tagType = "input" | "textarea";
export default {
  name: "ValidateInpute",
  props: {
    rules: Array as PropType<RulesProp>,
    modleValue: String,
    tag: {
      type: String as PropType<tagType>,
      default: "input"
    }
  },
  inheritAttrs: false,
  emits: ["empty-input", "update:modleValue"],
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
            case "custom":
              passed = rule.validator ? rule.validator() : true;
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

<style scoped>
textarea {
  resize: none;
}
</style>
