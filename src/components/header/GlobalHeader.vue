<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">开怀专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2"
          >登录</router-link
        >
      </li>
      <li class="list-inline-item">
        <a href="javascript:;" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <dropdown-menu v-else :title="`您好 ${user.name}`"></dropdown-menu>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserProps } from "@/typeings/interface";
import DropdownMenu from "../dropdown-menu/DropdownMenu.vue";
export default defineComponent({
  components: { DropdownMenu },
  name: "Header",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
});
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
</style>
