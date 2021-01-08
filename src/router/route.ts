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
      redirectAlreadyLogin: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue")
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
      requiredLogin: true
    }
  },
  {
    path: "/posts/:id",
    name: "posts",
    component: () => import("@/views/PostDetail.vue")
  }
];
