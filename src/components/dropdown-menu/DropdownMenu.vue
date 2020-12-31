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
    >
      <dropdown-item>新建文章</dropdown-item>
      <dropdown-item>编辑资料</dropdown-item>
      <dropdown-item disabled>进入专栏</dropdown-item>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
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
    const isShow = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleDropdownMenu = () => {
      isShow.value = !isShow.value;
    };
    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      if (isShow.value && isClickOutside.value) {
        isShow.value = false;
      }
    });
    return {
      isShow,
      dropdownRef,
      toggleDropdownMenu
    };
  }
};
</script>

<style scoped>
.menu-show {
  display: block;
}
</style>
