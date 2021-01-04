<template>
  <validate-form @submit-form="submitForm">
    <div class="form-group mb-3">
      <label class="form-label">邮箱地址：</label>
      <validate-inpute
        :rules="emailRules"
        type="text"
        v-model:modleValue="formData.email"
        placeholder="请输入您的邮箱"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label">昵称：</label>
      <validate-inpute
        :rules="nickNameRules"
        type="text"
        v-model:modleValue="formData.nickName"
        placeholder="请输入您的昵称"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label">密码：</label>
      <validate-inpute
        :rules="passwordRules"
        type="password"
        v-model:modleValue="formData.password"
        placeholder="请输入您的密码"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label">确认密码：</label>
      <validate-inpute
        :rules="confirmPasswordRules"
        type="password"
        v-model:modleValue="formData.confirmPassword"
        placeholder="请输入确认您的密码"
      />
    </div>
    <template v-slot:submit>
      <button class="btn btn-primary w-25">注册</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import createMessage from "../components/createMessage";
import { RuleProp } from "@/typeings/interface";
import ValidateForm from "@/components/form/ValidateForm.vue";
import ValidateInpute from "@/components/form/ValidateInpute.vue";

export default {
  name: "Signup",
  components: { ValidateForm, ValidateInpute },
  setup() {
    const router = useRouter();
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      confirmPassword: ""
    });
    const emailRules: RuleProp[] = [
      {
        type: "required",
        message: "请输入邮箱"
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱格式"
      }
    ];
    const nickNameRules: RuleProp[] = [
      {
        type: "required",
        message: "昵称不能为空"
      }
    ];
    const passwordRules: RuleProp[] = [
      {
        type: "required",
        message: "密码不能为空"
      }
    ];
    const confirmPasswordRules: RuleProp[] = [
      {
        type: "required",
        message: "确认密码不能为空"
      },
      {
        type: "custom",
        message: "密码不相同",
        validator: () => {
          return formData.password === formData.confirmPassword;
        }
      }
    ];

    const submitForm = (status: boolean) => {
      if (status) {
        const body = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        };
        axios
          .post("/test/users", body)
          .then(() => {
            createMessage("注册成功，正在前往登录页", "success");
            setTimeout(() => {
              router.push("/login");
            }, 1600);
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      confirmPasswordRules,
      submitForm
    };
  }
};
</script>

<style scoped></style>
