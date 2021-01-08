<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? "编辑文章" : "新建文章" }}</h4>
    <upload-file
      actionUrl="/test/upload"
      :beforeUpload="beforeUploadValidation"
      :uploaded="uploadData"
      @uploadSuccess="onUploadSuccess"
      class="d-flex justify-content-center align-items-center bg-light text-secondary h-100 "
    >
      <h3>点击上传头图</h3>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h3>正在上传</h3>
        </div>
      </template>
      <template #uploadSuccess="data">
        <img :src="data.uploadedData.data.url" alt="" />
      </template>
    </upload-file>
    <validate-form @submitForm="submitForm">
      <div class="mb-3">
        <label class="form-label">文章标题: </label>
        <validate-inpute
          :rules="titleRules"
          v-model:modleValue="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情: </label>
        <validate-inpute
          tag="textarea"
          rows="10"
          :rules="contentRules"
          v-model:modleValue="contentVal"
          placeholder="请输入文章内容"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary">
          {{ isEditMode ? "更新文章" : "提交" }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { beforeUploadCheck } from "@/hooks/helper";
import {
  StoreData,
  PostProps,
  RuleProp,
  ResponseType,
  ImageProps
} from "@/typeings/interface";
import ValidateForm from "@/components/form/ValidateForm.vue";
import ValidateInpute from "@/components/form/ValidateInpute.vue";
import UploadFile from "@/components/UploadFile.vue";
import createMessage from "@/components/createMessage";
import axios from "axios";

export default {
  components: { ValidateForm, ValidateInpute, UploadFile },
  name: "CreatePost",
  setup() {
    const store = useStore<StoreData>();
    const router = useRouter();
    const route = useRoute();
    // 编辑模式 获取到编辑文章的id
    const isEditMode = !!route.query.id;
    const uploadData = ref();
    const titleVal = ref("");
    const contentVal = ref("");
    let imageId: string;
    const titleRules: RuleProp[] = [
      {
        type: "required",
        message: "请添加文章标题"
      }
    ];
    const contentRules: RuleProp[] = [
      {
        type: "required",
        message: "请添加文章内容"
      }
    ];
    const submitForm = (res: boolean) => {
      if (res) {
        if (store.state.user.column) {
          const { column, _id } = store.state.user;
          const post: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          };
          if (imageId) {
            post.image = imageId;
          }
          const actionName = isEditMode ? "updatePost" : "createPost";
          const sendData = isEditMode
            ? {
                id: route.query.id,
                payload: post
              }
            : post;
          const title = isEditMode ? "更新成功" : "发表成功";
          store.dispatch(actionName, sendData).then(() => {
            createMessage(title + "，正在跳转到文章", "success");
            setTimeout(() => {
              titleVal.value = "";
              contentVal.value = "";
              router.push({
                name: "column",
                params: {
                  id: column
                }
              });
            }, 2100);
          });
        }
      }
    };
    // 上传之前验证
    const beforeUploadValidation = (file: File) => {
      const res = beforeUploadCheck(file, {
        format: ["image/jpg", "image/jpeg", "image/png"],
        size: 1
      });
      if (res.error === "format") {
        createMessage("上传的图片只能是 JPG/PNG 格式！", "error");
      }
      if (res.error === "size") {
        createMessage("上传的图片大小不能超过 1MB", "error");
      }
      return res.passed;
    };
    // 上传成功
    const onUploadSuccess = (data: ResponseType<ImageProps>) => {
      if (data.data._id) {
        imageId = data.data._id;
      }
    };
    // 编辑模式 获取对应id文章的详情
    onMounted(() => {
      if (isEditMode) {
        axios.get(`/test/posts/${route.query.id}`).then(res => {
          const editPost = res.data.data;
          uploadData.value = { data: { url: editPost.image.url } };
          titleVal.value = editPost.title;
          contentVal.value = editPost.content;
        });
      }
    });
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      submitForm,
      beforeUploadValidation,
      onUploadSuccess,
      uploadData,
      isEditMode
    };
  }
};
</script>

<style scoped>
.file-load-wrapper {
  height: 15rem;
  cursor: pointer;
  margin: 2rem 0;
}
.file-load-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
