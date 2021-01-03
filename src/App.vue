<template>
  <div class="container">
    <Header :user="userData"></Header>
    <router-view></router-view>
    <Footer />
  </div>
  <loading v-if="isLoading"></loading>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { StoreData } from "./typeings/interface";
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import Loading from "./components/loading/Loading.vue";
export default {
  name: "App",
  components: { Header, Footer, Loading },
  setup() {
    const store = useStore<StoreData>();
    const userData = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    return {
      userData,
      isLoading
    };
  }
};
</script>
