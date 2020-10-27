import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue")
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/users/RegisterUser.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/users/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/users/Logout.vue")
  },
  {
    path: "/secret",
    name: "Secret",
    component: () => import("../views/About.vue")
  },
  { path: "/parkingspot",
    name: "parkingspot",
    component: () => import("../views/parkingspot.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/about", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("access_token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
