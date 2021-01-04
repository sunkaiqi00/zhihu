import { createApp } from "vue";
import MessageAlert from "./MessageAlert.vue";
type MessageType = "success" | "error" | "default";

const createMessage = (message: string, type: MessageType, delay = 1000) => {
  const messageInstance = createApp(MessageAlert, {
    message,
    type
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);
  setTimeout(() => {
    messageInstance.unmount(mountNode);
    document.body.removeChild(mountNode);
  }, delay);
};

export default createMessage;
