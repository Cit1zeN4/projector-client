import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/view/Main.vue"),
      meta: { title: "Projector" },
    },
    {
      path: "/login",
      component: () => import("@/view/LogIn.vue"),
      meta: { title: "Log In" },
    },
    {
      path: "/signup",
      component: () => import("@/view/SignUp.vue"),
      meta: { title: "Sign Up" },
    },
    {
      path: "/user/profile",
      component: () => import("@/view/Profile.vue"),
      meta: { title: "Profile" },
    },
    {
      path: "/user/profile/edit",
      component: () => import("@/view/ProfileEdit.vue"),
      meta: { title: "Edit" },
    },
    {
      path: "/projects",
      component: () => import("@/view/ProjectList.vue"),
      meta: { title: "Projects" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
