import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./route";
import store from "../store";
const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: "login" });
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
