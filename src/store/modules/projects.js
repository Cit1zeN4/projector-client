export default {
  actions: {
    createProject(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/project/`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addProject", body.project);
          });
        else {
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
        }
      });
    },
    fetchProjects(ctx) {
      ctx.commit("clearProjects");
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/project/`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addProject", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    fetchProjectById(ctx, id) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/project/${id}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("setCurrentProject", body);
            ctx.dispatch("fetchManagerById", body.managerId);
            ctx.dispatch("fetchProjectUsers", body.id);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    fetchManagerById(ctx, managerId) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users/${managerId}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addManagerData", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    deleteProjectById(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/project/${data.id}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) {
          ctx.commit("deleteProject", data.id);
          data.redirect.push("/projects");
        } else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    fetchProjectUsers(ctx, projectId) {
      ctx.dispatch("clearProjectUsers");
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/project/${projectId}/users`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addUserToProject", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    createProjectUser(ctx, data) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/project/${data.projectId}/users/${data.userId}`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addUserToProject", body.user);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    deleteProjectUser(ctx, data) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/project/${data.projectId}/users/${data.userId}`,
        {
          method: "DELETE",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("deleteUserFromProject", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    updateUserProjectRole(ctx, data) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/project/${data.projectId}/users/${data.userId}`,
        {
          method: "PUT",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ role: data.role }),
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("updateUserRole", body);
          });
        res.json().then((error) => {
          ctx.dispatch("throwError", error);
        });
      });
    },
  },
  mutations: {
    addProject(state, data) {
      if (data instanceof Array) state.projects.push(...data);
      else state.projects.push(data);
    },
    clearProjects(state) {
      state.projects = [];
    },
    setCurrentProject(state, data) {
      state.currentProject = data;
    },
    deleteProject(state, id) {
      const removeIndex = state.projects
        .map(function(item) {
          return item.id;
        })
        .indexOf(id);
      state.projects.splice(removeIndex, 1);
    },
    clearCurrentProject(state) {
      state.currentProject = {};
      state.currentProjectManger = {};
      state.currentProjectUsers = [];
    },
    addManagerData(state, data) {
      state.currentProjectManger = data;
    },
    addUserToProject(state, user) {
      if (user instanceof Array) state.currentProjectUsers.push(...user);
      else state.currentProjectUsers.push(user);
    },
    deleteUserFromProject(state, userId) {
      const removeIndex = state.currentProjectUsers
        .map(function(item) {
          return item.id;
        })
        .indexOf(userId);
      state.currentProjectUsers.splice(removeIndex, 1);
    },
    updateUserRole(state, data) {
      const updateIndex = state.currentProjectUsers
        .map((item) => item.id)
        .indexOf(data.userId);
      state.currentProjectUsers[updateIndex].user_project.role = data.role;
    },
    clearProjectUsers(state) {
      state.currentProjectUsers = [];
    },
  },
  getters: {
    getAllProjects(state) {
      return state.projects;
    },
    getCurrentProject(state) {
      return state.currentProject;
    },
    getCurrentProjectManager(state) {
      return state.currentProjectManger;
    },
    getCurrentProjectUsers(state) {
      return state.currentProjectUsers;
    },
  },
  state: {
    projects: [],
    currentProject: {},
    currentProjectManger: {},
    currentProjectUsers: [],
  },
};
