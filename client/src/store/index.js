import Vue from "vue";
import Vuex from "vuex";

import db from "./fake-db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db,
    token: localStorage.getItem("access_token") || null
  },
  mutations: {
    setAccessToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    retriveToken(state, credentials) {
      // fetch from api
      // const token = response.data.access_token

      // Dette skal være serverside
      const username = credentials.username;
      const password = credentials.password;

      const users = db.users;

      const user = users.find((user) => user.username === username);
      if (user) {
        console.table([
          [user.username, username],
          [user.password, password]
        ]);

        if (user.password === password) {
          const token = credentials.username;

          localStorage.setItem("access_token", token);
          state.commit("setAccessToken", token);

          return true;
        }
      }
    },
    logout(state) {
      (state.token = null), localStorage.removeItem("access_token");
    }
  },
  modules: {},
  getters: {
    loggedIn: (state) => state.token !== null
  }
});
