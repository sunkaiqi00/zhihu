<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img
        :src="fitUrl"
        :alt="user.nickName"
        class="rounded-circle img-thumbnail w-25"
      />
      <div class="detail ml-2 w-100">
        <h6 class="d-block mb-0">{{ user.nickName }}</h6>
        <span class="text-truncate text-muted d-block">
          {{ user.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from "vue";
import { UserProps } from "@/typeings/interface";
export default {
  name: "UserProfile",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    const fitUrl = computed(() => {
      if (props.user.avatar) {
        return props.user.avatar.url;
      } else {
        return require("@/assets/image/avatar.png");
      }
    });

    return {
      fitUrl
    };
  }
};
</script>

<style scoped>
.detail {
  overflow: hidden;
}
</style>
