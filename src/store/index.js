import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "./AuthStore";
import ChatStore from "./ChatStore";
import ProfileStore from "./ProfileStore";
import PostStore from "./PostStore";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      AuthStore,
      ChatStore,
      ProfileStore,
      PostStore
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}