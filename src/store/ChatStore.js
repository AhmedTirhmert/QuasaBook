import { Auth, database } from "boot/firebase";
import Vue from "vue";

// Global Variables

//where the auth data goes
const state = {};

//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {};

//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  deleteChat({ rootState }, otherUserId) {
    let Ref = database.ref(
      "Chats/" + rootState.AuthStore.userCredential.UserId + "/" + otherUserId
    );
    Ref.remove();
    setTimeout(() => {
      return true;
    }, 8000);
  }
};

//methods to get data from state object and make availible in vue components
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
