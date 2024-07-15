import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/home.vue";

export const routes = [
  {
    path: "/",
    redirect: "/home",
    isNav: false
  },
  {
    path: "/home",
    name: "home",
    components: {
      default: Home
    },
    meta: {
      title: "首页"
    },
    isNav: true
  },
  {
    path: "/msg",
    name: "msg",
    components: {
      default: () => import("../views/msg.vue")
    },
    meta: {
      title: "未读消息"
    },
    isNav: true,
    isShow: "login"
  },
  {
    path: "/learn",
    name: "learn",
    components: {
      default: () => import("../views/learn.vue")
    },
    meta: {
      title: "新手入门"
    },
    isNav: true
  },
  {
    path: "/api",
    name: "api",
    components: {
      default: () => import("../views/api.vue")
    },
    meta: {
      title: "API"
    },
    isNav: true
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: () => import("../views/about.vue")
    },
    meta: {
      title: "关于"
    },
    isNav: true
  },
  {
    path: "/register",
    name: "register",
    components: {
      default: () => import("../views/register.vue")
    },
    meta: {
      title: "注册"
    },
    isNav: true,
    isShow: "noLogin"
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("../views/login.vue")
    },
    meta: {
      title: "登录"
    },
    isNav: true,
    isShow: "noLogin"
  },
  {
    path: "/detail/:id",
    name: "detail",
    components: {
      default: () => import("../views/detail.vue")
    },
    meta: {
      title: "详情"
    },
    isNav: false
  },
  {
    path: "/author/:name",
    name: "author",
    components: {
      default: () => import("../views/author.vue")
    },
    meta: {
      title: "作者"
    },
    isNav: false
  },
  {
    path: "/setting",
    name: "setting",
    components: {
      default: () => import("../views/setting.vue")
    },
    meta: {
      title: "设置"
    },
    isNav: true,
    isShow: "login"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// app.use(router);
export default router;
