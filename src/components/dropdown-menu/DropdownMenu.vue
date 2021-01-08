<template>
  <div class="dropdown">
    <button
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.stop="toggleDropdownMenu"
    >
      {{ title }}
    </button>
    <div
      class="dropdown-menu"
      ref="dropdownRef"
      :class="{ 'menu-show': isShow }"
      @click="onHide"
    >
      <dropdown-item @click="onGoCreatePostPage">新建文章</dropdown-item>
      <dropdown-item>编辑资料</dropdown-item>
      <dropdown-item @click="onGoColumn">进入专栏</dropdown-item>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useClickOutside from "@/hooks/useClickOutside";
import DropdownItem from "./DropdownItem.vue";
export default {
  components: { DropdownItem },
  name: "DropdownMenu",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isShow = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleDropdownMenu = () => {
      isShow.value = !isShow.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);
    const onGoCreatePostPage = () => {
      router.push("/createpost");
    };
    watch(isClickOutside, () => {
      if (isShow.value && isClickOutside.value) {
        isShow.value = false;
      }
    });
    const onHide = (e: MouseEvent) => {
      const menuChild = document.querySelectorAll(".dropdown-item");
      const clickItem = Array.prototype.slice
        .call(menuChild)
        .find(item => item === e.target);
      if (clickItem) {
        isShow.value = false;
      }
    };
    // 进入专栏
    const onGoColumn = () => {
      const { column } = store.state.user;
      if (column) {
        router.push({
          name: "column",
          params: {
            id: column
          }
        });
      }
    };
    return {
      isShow,
      dropdownRef,
      toggleDropdownMenu,
      onGoCreatePostPage,
      onHide,
      onGoColumn
    };
  }
};
</script>

<style scoped>
.menu-show {
  display: block;
}
</style>
