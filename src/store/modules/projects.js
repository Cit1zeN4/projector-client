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
  },
  getters: {
    getAllProjects(state) {
      return state.projects;
    },
    getCurrentProject(state) {
      return state.currentProject;
    },
  },
  state: {
    projects: [],
    currentProject: {},
  },
};