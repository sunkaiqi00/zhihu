<template>
  <div class="home">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/image/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createpost" class="btn btn-primary my-2">
              开始写文章
            </router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="columns"></column-list>
    <div class="loading-more text-center">
      <button
        class="btn btn-primary mt-2 mb-5 mx-auto btn-block w-25"
        @click="loadMorePage"
        v-if="!isLastPage"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StoreData } from "@/typeings/interface";
import ColumnList from "../components/column/ColumnList.vue";
import useLoadMore from "../hooks/useLoadMore";

interface A {
  code: number;
  msg: string;
  data: {};
}
export default {
  name: "Home",
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<StoreData>();
    const total = computed(() => store.state.columns.total);
    const currentPage = computed(() => store.state.columns.currentPage);
    const { loadMorePage, isLastPage } = useLoadMore("setColumns", total, {
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      pageSize: 3
    });

    const columns = computed(() => store.getters.getColumns);

    onMounted(() => {
      store.dispatch("setColumns", { pageSize: 3 });
    });
    return {
      columns,
      loadMorePage,
      isLastPage
    };
  }
};
</script>

<style scoped>
.home {
  padding: 0 6rem;
}
</style>
