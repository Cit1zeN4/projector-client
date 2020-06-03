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
          if (res.status === 423) ctx.commit("setAccessError");
          else
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
        else if (res.status === 423) ctx.commit("setAccessError");
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
            ctx.dispatch("fetchCurrentProjectTasks", body.id);
          });
        else if (res.status === 423) ctx.commit("setAccessError");
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    updateProjectById(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/project/${data.id}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      }).then((res) => {
        if (!res.ok)
          res.json().then((error) => {
            ctx.commit("setAccessError");
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
      ctx.commit("clearProjectUsers");
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
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    fetchCurrentProjectTasks(ctx, projectId) {
      ctx.commit("clearProjectTasks");
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/task/project/${projectId}`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addTaskProject", body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    addTaskColumn(ctx, data) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/task/project/${data.projectId}/column`,
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data.form),
        }
      ).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            if (!body.tasks) body.tasks = [];
            ctx.commit("addTaskProject", body);
          });
      });
    },
    deleteTaskColumn(ctx, data) {
      fetch(
        `http://${process.env.VUE_APP_API_HOST}/api/task/project/${data.projectId}/column/${data.columnId}`,
        {
          method: "DELETE",
          credentials: "include",
          mode: "cors",
        }
      ).then((res) => {
        if (res.ok) ctx.commit("deleteColumn", data.columnId);
      });
    },
    addTask(ctx, task) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/task/`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            ctx.commit("addTaskToColumn", body.task);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
    deleteTask(ctx, taskId) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok)
          res.json().then(() => {
            ctx.commit("deleteTaskFromColumn", taskId);
          });
        else
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
    addTaskProject(state, data) {
      if (data instanceof Array) state.currentProjectTasks.push(...data);
      else state.currentProjectTasks.push(data);
    },
    clearProjectTasks(state) {
      state.currentProjectTasks = [];
    },
    deleteColumn(state, columnId) {
      const removeIndex = state.currentProjectTasks
        .map((item) => {
          return item.id;
        })
        .indexOf(columnId);
      state.currentProjectTasks.splice(removeIndex, 1);
    },
    addTaskToColumn(state, task) {
      state.currentProjectTasks.forEach((column) => {
        if (column.id === task.taskColumnId) {
          column.tasks.push(task);
        }
      });
    },
    deleteTaskFromColumn(state, taskId) {
      state.currentProjectTasks.forEach((column, cIndex) => {
        column.tasks.forEach((task, tIndex) => {
          if (task.id === taskId)
            state.currentProjectTasks[cIndex].tasks.splice(tIndex, 1);
        });
      });
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
    getCurrentProjectTasks(state) {
      return state.currentProjectTasks;
    },
    getCurrentProjectUsersSelect(state) {
      return [{ value: null, text: "No user" }].concat(
        state.currentProjectUsers.map((u) => {
          return { value: u.id, text: u.firstName };
        })
      );
    },
  },
  state: {
    projects: [],
    currentProject: {},
    currentProjectManger: {},
    currentProjectUsers: [],
    currentProjectTasks: [],
  },
};
