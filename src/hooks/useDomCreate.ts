import { onUnmounted } from "vue";

function useCreateDom(domId) {
  const node = document.createElement("div");
  node.id = domId;
  document.body.appendChild(node);
  onUnmounted(() => {
    document.body.removeChild(node);
  });
}
export default useCreateDom;
