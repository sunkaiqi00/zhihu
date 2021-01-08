import { onUnmounted } from "vue";

function useDomCreate(domId) {
  const node = document.createElement("div");
  node.id = domId;
  document.body.appendChild(node);
  onUnmounted(() => {
    document.body.removeChild(node);
  });
}
export default useDomCreate;
