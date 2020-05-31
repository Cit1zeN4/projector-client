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
    {
      path: "/projects/:id",
      component: () => import("@/view/Project.vue"),
      meta: { title: "Project" },
      props: true,
      children: [
        {
          path: "",
          component: () => import("@/components/AboutProject"),
          meta: { title: "Project" },
        },
        {
          path: "files",
          component: () => import("@/components/ProjectFiles"),
          meta: { title: "Files" },
        },
        {
          path: "people",
          component: () => import("@/components/ProjectPeople"),
          meta: { title: "People" },
        },
        {
          path: "tasks",
          component: () => import("@/components/ProjectTasks"),
          meta: { title: "Tasks" },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
