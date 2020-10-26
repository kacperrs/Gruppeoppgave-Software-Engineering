import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null
  },
  mutations: {
    setAccessToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    async retriveToken(state, credentials) {
      await axios
        .post("http://localhost:5000/login", credentials)
        .then((response) => {
          if (response.status === 200) {
            const token = credentials.email;

            localStorage.setItem("access_token", token);
            state.commit("setAccessToken", token);
          }
        })
        .catch((error) => {
          console.log("Login failed!", error.message);
          return false;
        });
    },
    logout(state) {
      (state.token = null), localStorage.removeItem("access_token");
    }
  },
  modules: {},
  getters: {
    loggedIn: (state) => state.token !== null,
    getUsers: (state) => state.db.users
  }
});
