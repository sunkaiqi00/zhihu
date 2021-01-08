<template>
  <div class="container-fluid">
    <Header :user="userData"></Header>
    <router-view></router-view>
    <Footer />
  </div>
  <loading v-if="isLoading"></loading>
</template>

<script lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import createMessage from "./components/createMessage";
import { StoreData } from "./typeings/interface";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";
export default {
  name: "App",
  components: { Header, Footer, Loading },
  setup() {
    const store = useStore<StoreData>();
    const userData = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    return {
      userData,
      isLoading,
      error
    };
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 0;
  overflow-x: hidden;
}
</style>
