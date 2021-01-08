<template>
  <div class="file-load-wrapper">
    <div
      class="file-btn-wrapper"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary">正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploadSuccess"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-paimary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传文件</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change.prevent="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { ref, PropType, watch } from "vue";
import axios from "axios";
type uploadStatua = "ready" | "loading" | "success" | "error";
type chuckFunction = (file: File) => boolean;
export default {
  name: "UploadFile",
  props: {
    actionUrl: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<chuckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  emits: ["uploadSuccess", "uploadError"],
  inheritAttrs: false,
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<uploadStatua>(props.uploaded ? "success" : "ready");
    const uploadedData = ref(props.uploaded);
    watch(
      () => props.uploaded,
      newData => {
        fileStatus.value = "success";
        uploadedData.value = newData;
      }
    );
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const files = Array.from(target.files);
        if (props.beforeUpload) {
          const status = props.beforeUpload(files[0]);
          if (!status) {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
            return;
          }
        }
        fileStatus.value = "loading";
        const formData = new FormData();
        formData.append("file", files[0]);
        axios
          .post(props.actionUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            fileStatus.value = "success";
            uploadedData.value = res.data;
            context.emit("uploadSuccess", res.data);
          })
          .catch(err => {
            fileStatus.value = "error";
            context.emit("uploadError", err);
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      uploadedData,
      handleFileChange
    };
  }
};
</script>
