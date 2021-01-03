import store from "@/store";

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      redirectAlreadyLogin: store.state.user.isLogin
    }
  },
  {
    path: "/column/:id",
    name: "column",
    component: () => import("@/views/ColumnDetail.vue")
  },
  {
    path: "/createpost",
    name: "createpost",
    component: () => import("@/views/CreatePost.vue"),
    meta: {
      requiredLogin: store.state.user.isLogin
    }
  }
];
