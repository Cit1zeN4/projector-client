export default {
  actions: {
    async login(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((body) => {
              ctx.commit("updateUser", body);
              if (data.redirect) data.redirect.push("/");
            });
          } else {
            res.json().then((error) => ctx.dispatch("throwError", error));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async signup(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((body) => {
              console.log(body);
              ctx.commit("updateUser", body);
              if (data.redirect) data.redirect.push("/");
            });
          } else {
            res.json().then((error) => ctx.dispatch("throwError", error));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async auth(ctx) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/auth/`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((body) => {
              ctx.commit("updateUser", body);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async logout(ctx) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
      })
        .then((res) => {
          if (!res.ok)
            res.json().then((error) => {
              ctx.dispatch("throwError", error);
            });
          else ctx.commit("logout");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    updateUser(state, data) {
      state.user.auth = true;
      for (let property in data.user) {
        state.user[property] = data.user[property];
      }
      state.refreshTokenExpireIn = data.refreshTokenExpireIn;
      state.accessTokenExpireIn = data.accessTokenExpireIn;
    },
    logout(state) {
      state.user.auth = false;
      state.refreshTokenExpireIn = "";
      state.accessTokenExpireIn = "";

      state.user.firstName = "";
      state.user.surname = "";
      state.user.middleName = "";
      state.user.email = "";
      state.user.photoLink = "";
    },
  },
  state: {
    user: {
      auth: false,
      firstName: "",
      surname: "",
      middleName: "",
      email: "",
      photoLink: "",
    },
    refreshTokenExpireIn: "",
    accessTokenExpireIn: "",
  },
  getters: {
    isUserAuth(state) {
      return state.user.auth;
    },
    userFullName(state) {
      return `${state.user.firstName} ${state.user.surname}`;
    },
    userShortName(state) {
      return `${state.user.firstName[0]}${state.user.surname[0]}`;
    },
    getImage(state) {
      return state.user.photoLink;
    },
    getEmail(state) {
      return state.user.email;
    },
  },
};
