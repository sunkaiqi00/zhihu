<template>
  <div class="row" v-if="columnList">
    <div v-for="item of columnList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.avatar && item.avatar.url"
            :alt="item.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <div class="btn btn-outline-primary" @click="goColumn(item._id)">
            进入专栏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from "vue";
import { ColumnProps } from "@/typeings/interface";
import { useRouter } from "vue-router";
export default {
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = require("@/assets/image/avatar.png");
        } else {
          item.avatar.url += "?x-oss-process=image/resize,m_pad,h_50,w_50";
        }
        return item;
      });
    });
    const goColumn = id => {
      router.push({
        name: "column",
        params: { id }
      });
    };
    return {
      columnList,
      goColumn
    };
  }
};
</script>

<style scoped>
.card-text {
  text-align: left;
  text-indent: 2rem;
}
</style>
