<template>
  <validate-form @submit-form="onSubmitForm">
    <div class="form-group mb-3">
      <label class="form-label">邮箱地址：</label>
      <validate-inpute
        :rules="emailRules"
        v-model:modleValue="emailVal"
        placeholder="请输入邮箱地址"
        type="text"
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
      <button class="btn btn-primary w-25">登录</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import createMessage from "../components/createMessage";
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
    const onSubmitForm = (res: boolean) => {
      if (res) {
        const body = {
          email: emailVal.value,
          password: passwordVal.value
        };
        store
          .dispatch("loginAndGetUser", body)
          .then(() => {
            createMessage("登陆成功，正在前往首页", "success");
            setTimeout(() => {
              router.push("/");
            }, 2100);
            emailVal.value = "";
            passwordVal.value = "";
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onSubmitForm
    };
  }
};
</script>
