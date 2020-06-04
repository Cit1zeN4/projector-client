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
            ctx.dispatch("fetchRoles");
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
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    deleteUser(ctx, userId) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) ctx.commit("deleteUser", userId);
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    createUser(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addUser", body.user);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    fetchRoles(ctx) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/roles/`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addRole", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    updateUser(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users/${data.id}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (!res.ok)
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
  },
  mutations: {
    addUser(state, data) {
      console.log(data);
      if (data instanceof Array) state.users.push(...data);
      else state.users.push(data);
    },
    deleteUser(state, userId) {
      const removeIndex = state.users
        .map(function(item) {
          return item.id;
        })
        .indexOf(userId);
      state.users.splice(removeIndex, 1);
    },
    clearUsers(state) {
      state.users = [];
    },
    addRole(state, data) {
      if (data instanceof Array) state.roles.push(...data);
      else state.roles.push(data);
    },
  },
  state: {
    users: [],
    roles: [],
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getRoles(state) {
      return state.roles;
    },
  },
};
