import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  let timer: number | null;
  const handleClick = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value?.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
    timer = setTimeout(() => {
      isClickOutside.value = false;
    }, 17);
  };
  onMounted(() => {
    document.addEventListener("click", handleClick);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
    timer = null;
  });
  return isClickOutside;
};

export default useClickOutside;
