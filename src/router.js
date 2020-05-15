import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/components/Main.vue"),
      meta: { title: "Projector" },
    },
    {
      path: "/login",
      component: () => import("@/components/LogIn.vue"),
      meta: { title: "Log In" },
    },
    {
      path: "/signup",
      component: () => import("@/components/SignUp.vue"),
      meta: { title: "Sign Up" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
