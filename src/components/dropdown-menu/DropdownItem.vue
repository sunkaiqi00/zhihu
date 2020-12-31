<template>
  <a
    class="dropdown-item"
    href="javascript:;"
    :class="{ 'is-disabled': disabled }"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "DropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.is-disabled {
  color: #999999;
  pointer-events: none;
}
</style>
