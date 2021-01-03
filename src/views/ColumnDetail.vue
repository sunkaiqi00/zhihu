<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :posts="list" />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { StoreData } from "@/typeings/interface";
import { useRoute } from "vue-router";
import PostList from "@/components/column/PostList.vue";
export default {
  components: { PostList },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore<StoreData>();
    const currentId = +route.params.id;
    const column = store.getters.getColumns(currentId);
    const list = store.getters.getPosts(currentId);
    return {
      column,
      list
    };
  }
};
</script>

<style scoped></style>
