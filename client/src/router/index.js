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
    path: "/Submitparkingspot",
    name: "Submitparkingspot",
    component: () => import("../views/Submitparkingspot.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/users/Profile.vue")
  },
  {
    path: "/findparkingspot",
    name: "Parkingspot",
    component: () => import("../views/parking/FindParkingspot.vue")
  },
  {
    path: "/bookparkingspot",
    name: "BookParkingspot",
    component: () => import("../views/parking/BookParkingspot.vue"),
    props: true
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/Payment.vue")
  },

  {
    path: "/myspots",
    name: "Myspots",
    component: () => import("../views/parking/Myspots.vue")
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: () => import("../views/users/EditProfile.vue")
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
