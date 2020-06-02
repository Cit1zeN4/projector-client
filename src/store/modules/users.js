export default {
  actions: {
    fetchUsers(ctx) {
      ctx.commit("clearUsers");
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) {
          res.json().then((body) => {
            ctx.commit("addUser", body);
          });
        } else {
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
        }
      });
    },
    fetchUserTasks(ctx, userId) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/users/${userId}/tasks`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addUserTasks", body);
          });
      });
    },
    fetchUserProjects(ctx, userId) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/users/${userId}/projects`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addUserProjects", body);
          });
      });
    },
  },
  mutations: {
    addUser(state, data) {
      if (data instanceof Array) state.users.push(...data);
      else state.users.push(data);
    },
    clearUsers(state) {
      state.users = [];
    },
    addUserTasks(state, data) {
      state.currentUserTasks = data;
    },
    addUserProjects(state, data) {
      state.currentUserProjects = data;
    },
  },
  state: {
    users: [],
    currentUserTasks: [],
    currentUserProjects: [],
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getUserTasks(state) {
      return state.currentUserTasks;
    },
    getUserProjects(state) {
      return state.currentUserProjects;
    },
  },
};
