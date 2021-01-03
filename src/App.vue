<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <router-view></router-view>
    <global-footer />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { StoreData } from "./typeings/interface";
import GlobalHeader from "@/components/header/GlobalHeader.vue";
import GlobalFooter from "@/components/footer/GlobalFooter.vue";

export default {
  name: "App",
  components: { GlobalHeader, GlobalFooter },
  setup() {
    const store = useStore<StoreData>();
    const userData = computed(() => store.state.user);
    return {
      userData
    };
  }
};
</script>
