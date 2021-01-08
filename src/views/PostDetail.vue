<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4 w-100"
        v-if="currentImageUrl"
      />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          >
          </user-profile>
        </div>
        <span class="text-muted col text-right font-italic">
          发表于：{{ currentPost.createdAt }}
        </span>
      </div>
      <div class="content" v-html="contentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          :to="{ name: 'createpost', query: { id: currentPost._id } }"
          type="button"
          class="btn btn-primary"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click="onDelete">
          删除
        </button>
      </div>
    </article>
  </div>
  <modal
    title="删除文章"
    :visible="modalVisible"
    @modalOnConfirm="onConfirm"
    @modalOnCancel="onCancel"
  >
    <p>确认要删除这篇文章吗?</p>
  </modal>
</template>

<script lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import MarkdownIt from "markdown-it";
import {
  PostProps,
  ImageProps,
  UserProps,
  ResponseType
} from "@/typeings/interface";
import { OK } from "@/store/actions";
import UserProfile from "@/components/UserProfile.vue";
import Modal from "@/components/Modal.vue";
import createMessage from "@/components/createMessage";

export default {
  name: "PostDetail",
  components: {
    UserProfile,
    Modal
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    // 删除确认框显示与否
    const modalVisible = ref(false);
    const currentPost = ref<PostProps>();
    const md = new MarkdownIt();
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (image as ImageProps).url + "?x-oss-process=image/resize,w_850";
      } else {
        return null;
      }
    });
    const contentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content);
      }
    });

    // 权限 仅可以修改 删除自己的文章
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user;
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps;
        return postAuthor._id === _id;
      } else {
        return false;
      }
    });

    const onConfirm = () => {
      modalVisible.value = false;
      console.log(1);
      store
        .dispatch("deletePost", route.params.id)
        .then((res: ResponseType<PostProps>) => {
          console.log(res);
          createMessage("删除成功，即将跳转到专栏页面", "success");
          setTimeout(() => {
            router.push({
              name: "column",
              params: { id: res.data.column }
            });
          }, 2100);
        })
        .catch(err => {
          console.error(err);
          createMessage("删除错误，出现未知错误", "error");
        });
    };
    const onCancel = () => {
      modalVisible.value = false;
    };
    const onDelete = () => {
      modalVisible.value = true;
    };
    onMounted(() => {
      const id = route.params.id;
      axios
        .get(`/test/posts/${id}`)
        .then(res => {
          if (res.data.code === OK) {
            currentPost.value = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
    return {
      currentPost,
      currentImageUrl,
      contentHTML,
      showEditArea,
      modalVisible,
      onConfirm,
      onCancel,
      onDelete
    };
  }
};
</script>

<style scoped></style>
