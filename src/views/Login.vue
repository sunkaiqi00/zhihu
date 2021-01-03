<template>
  <validate-form @submit-form="onSubmitForm">
    <div class="form-group mb-3">
      <label class="form-label">邮箱地址：</label>
      <validate-inpute
        :rules="emailRules"
        v-model:modleValue="emailVal"
        placeholder="请输入邮箱地址"
        type="text"
        ref="validateInputRef"
        @emptyInput="onEmptyInput"
      ></validate-inpute>
    </div>
    <div class="form-group mb-3">
      <label class="form-label">密码：</label>
      <validate-inpute
        :rules="passwordRules"
        v-model:modleValue="passwordVal"
        placeholder="请输入您的密码"
        type="password"
      ></validate-inpute>
    </div>
    <template v-slot:submit>
      <button type="submit" class="btn btn-primary">登录</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RuleProp } from "@/typeings/interface";
import ValidateInpute from "@/components/form/ValidateInpute.vue";
import ValidateForm from "@/components/form/ValidateForm.vue";
export default {
  name: "Login",
  components: { ValidateInpute, ValidateForm },
  setup() {
    const router = useRouter();
    const store = useStore();
    const emailRules: RuleProp[] = [
      {
        type: "required",
        message: "邮箱地址不能为空"
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱格式"
      }
    ];
    const passwordRules: RuleProp[] = [
      {
        type: "required",
        message: "密码不能为空"
      }
    ];
    const emailVal = ref("");
    const passwordVal = ref("");
    const validateInputRef = ref<unknown>("");
    const onEmptyInput = () => {
      emailVal.value = "";
      passwordVal.value = "";
    };
    const onSubmitForm = (res: boolean) => {
      if (res) {
        router.push("/");
        store.dispatch("login");
        emailVal.value = "";
        passwordVal.value = "";
      }
    };
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onSubmitForm,
      validateInputRef,
      onEmptyInput
    };
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
