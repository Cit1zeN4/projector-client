export default {
  actions: {
    login(ctx, data) {
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
            setTimeout(() => {
              ctx.dispatch("auth");
            }, ctx.state.accessTokenExpireIn - 120000);
          } else {
            res.json().then((error) => ctx.dispatch("throwError", error));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    signup(ctx, data) {
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
            setTimeout(() => {
              ctx.dispatch("auth");
            }, ctx.state.accessTokenExpireIn - 120000);
          } else {
            res.json().then((error) => ctx.dispatch("throwError", error));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    auth(ctx) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/auth/`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) {
          res.json().then((body) => {
            ctx.commit("updateUser", body);
            setTimeout(() => {
              ctx.dispatch("auth");
            }, 720000);
          });
        } else {
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
        }
      });
    },

    logout(ctx, redirect) {
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
          else {
            redirect.push("/");
            ctx.commit("logout");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateUserInfo(ctx, data) {
      fetch(`http://${process.env.VUE_APP_API_HOST}/api/users/${data.userId}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data.form),
      }).then((res) => {
        if (res.ok) {
          res.json().then((body) => {
            ctx.commit("updateUser", body);
            if (data.redirect) data.redirect.push("/user/profile");
          });
        } else {
          res.json().then((error) => {
            ctx.dispatch("throwError", error);
          });
        }
      });
    },
  },
  mutations: {
    updateUser(state, data) {
      state.user.auth = true;
      for (let property in data.user) {
        state.user[property] = data.user[property];
      }

      state.user.photoLink =
        data.user.photoLink ||
        `http://${process.env.VUE_APP_API_HOST}/public/files/img/profile.png`;

      state.refreshTokenExpireIn = data.refreshTokenExpireIn;
      state.accessTokenExpireIn = data.accessTokenExpireIn;
    },

    logout(state) {
      state.user.auth = false;
      state.refreshTokenExpireIn = "";
      state.accessTokenExpireIn = 900000;

      for (let property in state.user) {
        state.user[property] = "";
      }
    },
  },
  state: {
    user: {
      auth: false,
      id: "",
      firstName: "",
      surname: "",
      middleName: "",
      email: "",
      photoLink: "",
      role: "",
    },
    refreshTokenExpireIn: "",
    accessTokenExpireIn: 900000,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
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
    getUserId(state) {
      return state.user.id;
    },
    getUserForm(state) {
      return {
        firstName: state.user.firstName,
        surname: state.user.surname,
        middleName: state.user.middleName,
        photoLink: state.user.photoLink,
      };
    },
    getUserRole(state) {
      return state.user.role;
    },
  },
};
