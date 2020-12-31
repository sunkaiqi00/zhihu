<template>
  <div class="home">
    <column-list :list="testData"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ColumnmProps } from "../typeings/interface";
import ColumnList from "../components/ColumnList.vue";
const testData: ColumnmProps[] = [
  {
    id: 1,
    title: "周杰伦的专栏",
    avatar: "",
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    id: 2,
    title: "孙凯琪的专栏",
    avatar:
      "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    id: 3,
    title: "孙凯琪的专栏",
    avatar:
      "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    id: 4,
    title: "孙凯琪的专栏",
    avatar:
      "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  }
];
export default defineComponent({
  name: "Home",
  components: {
    ColumnList
  },
  setup() {
    return {
      testData
    };
  }
});
</script>

<style scoped></style>
