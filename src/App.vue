<template>
  <div class="container">
    <Header :user="userData"></Header>
    <router-view></router-view>
    <Footer />
  </div>
  <loading v-if="isLoading"></loading>
</template>

<script lang="ts">
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
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
    const token = computed(() => store.state.token);
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
    onMounted(() => {
      if (!userData.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        store.dispatch("getCurrentUser");
      }
    });
    return {
      userData,
      isLoading,
      error
    };
  }
};
</script>
