<template>
  <div class="row" v-if="columnList">
    <div v-for="item of columnList" :key="item.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.avatar"
            :alt="item.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <a href="javascript:;" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ColumnmProps } from "@/typeings/interface";
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnmProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = props.list.map(item => {
      if (!item.avatar) {
        item.avatar = require("@/assets/image/avatar.png");
      }
      return item;
    });
    return {
      columnList
    };
  }
});
</script>

<style scoped>
.card-text {
  text-align: left;
  text-indent: 2rem;
}
</style>
