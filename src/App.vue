<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <router-view></router-view>
    <global-footer />
  </div>
</template>

<script lang="ts">
import { UserProps } from "@/typeings/interface";
import GlobalHeader from "@/components/header/GlobalHeader.vue";
import GlobalFooter from "@/components/footer/GlobalFooter.vue";
const userData: UserProps = {
  id: 1,
  name: "开怀",
  isLogin: true
};
export default {
  name: "App",
  components: { GlobalHeader, GlobalFooter },
  setup() {
    return {
      userData
    };
  }
};
</script>
