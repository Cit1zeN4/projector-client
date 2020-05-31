import Vue from "vue";
import Vuex from "vuex";
import session from "./modules/session";
import projects from "./modules/projects";
import users from "./modules/users";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async throwError(ctx, err) {
      const data = {
        error: true,
        name: err.name,
        message: err.message,
      };
      ctx.commit("setError", data);
      setTimeout(() => {
        ctx.commit("cleanError");
      }, 4000);
    },
    closeError(ctx) {
      ctx.commit("cleanError");
    },
  },
  mutations: {
    setError(state, data) {
      state.error = data.error;
      state.name = data.name;
      state.message = data.message;
    },
    cleanError(state) {
      state.error = false;
      state.name = "";
      state.message = "";
    },
  },
  state: {
    error: false,
    name: "",
    message: "",
  },
  getters: {
    getError(state) {
      return state;
    },
  },
  modules: { session, projects, users, tasks },
});
