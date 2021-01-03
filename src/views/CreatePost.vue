<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
    </validate-form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { StoreData } from "@/typeings/interface";
import { PostProps } from "@/typeings/interface";
import { RuleProp } from "@/typeings/interface";
import ValidateForm from "@/components/form/ValidateForm.vue";
import ValidateInpute from "@/components/form/ValidateInpute.vue";
import router from "@/router";

export default {
  components: { ValidateForm, ValidateInpute },
  name: "CreatePost",
  setup() {
    const store = useStore<StoreData>();
    const titleVal = ref("");
    const contentVal = ref("");
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
        const { columnId } = store.state.user;
        const post: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: contentVal.value,
          columnId,
          createdAt: new Date().toLocaleString()
        };
        store.dispatch("createPost", post);
        titleVal.value = "";
        contentVal.value = "";
        router.push({
          name: "column",
          params: {
            id: columnId
          }
        });
      }
    };
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      submitForm
    };
  }
};
</script>
