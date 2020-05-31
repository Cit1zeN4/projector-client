export default {
  actions: {
    updateTask(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/task/${data.taskId}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      }).then((res) => {
        if (res.ok)
          res.json().then((body) => {
            console.log(body);
          });
        else
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
      });
    },
  },
  mutations: {},
  getters: {},
  state: {},
};
