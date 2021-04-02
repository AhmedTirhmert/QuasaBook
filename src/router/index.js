import Vue from "vue";
import VueRouter from "vue-router";
import { Auth } from "boot/firebase";
import store from "../store/AuthStore";
import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  Router.beforeEach((to, from, next) => {
    if (to.name == "Login") {
      if (!Auth.currentUser) {
        next();
      } else {
        next({ name: "Users" });
      }
    } else if (to.meta.requireAuth) {
      let stateUser = store.state.userCredential.UserId;
      console.log("stateUser =>", stateUser);
      if (Auth.currentUser || typeof stateUser !== "undefined") {
        console.log();
        next();
      } else {
        console.log("this is where we redirect to LOGIN ");
        next({ name: "Login" });
      }
    } else {
      next();
    }
  });
  return Router;
}
