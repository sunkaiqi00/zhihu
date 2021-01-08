<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.url"
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
import { useRoute } from "vue-router";
import { StoreData } from "@/typeings/interface";
import PostList from "@/components/column/PostList.vue";
import { computed, onMounted } from "vue";
import { generateUrl } from "@/hooks/helper";
export default {
  components: { PostList },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore<StoreData>();
    const currentId = route.params.id;

    const column = computed(() => {
      const column = store.getters.getColumnsById(currentId);
      if (column) {
        generateUrl(column, 100, 100);
      }
      return column;
    });
    const list = computed(() => store.getters.getPostsByCid(currentId));

    onMounted(() => {
      store.dispatch("setColumn", currentId);
      store.dispatch("setPosts", currentId);
    });
    return {
      column,
      list
    };
  }
};
</script>

<style scoped></style>
