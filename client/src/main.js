import Vue from "vue";
import "bulma/css/bulma.css";

import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import VCalendar from "v-calendar";
Vue.use(VCalendar);

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
