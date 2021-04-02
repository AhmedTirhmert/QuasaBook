import { Auth, database, storage } from "boot/firebase";
import Vue from "vue";

// Global Variables

//where the auth data goes
const state = {
  profileInfos: {},
  isProfileOwner: false,
  afterRegisterLoading: false
};

//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setAfterRegisterLoadings(state, bool) {
    state.afterRegisterLoading = bool;
  },
  setProfileInfos(state, payload) {
    state.profileInfos = payload;
  },
  setProfileOwner(state, payload) {
    if (payload.profileId == payload.currentUserId) {
      state.isProfileOwner = true;
    } else {
      state.isProfileOwner = false;
    }
  }
};

//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  firebaseUploadImage({}, payload) {
    return new Promise((resolve, reject) => {
      let path = payload.path;
      storage
        .ref(path)
        .put(payload.image)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(
            url => {
              resolve(url);
            },
            error => {
              reject(error);
            }
          );
        });
    });
  },
  firebaseUpdateProfilePicture(
    { commit, dispatch, rootState },
    ProfilePicture
  ) {
    return new Promise((reject, resolve) => {
      commit("setAfterRegisterLoadings", true);
      let path = `ProfilePictures/${rootState.AuthStore.userCredential.UserId}`;
      let UserPath = `Users/${rootState.AuthStore.userCredential.UserId}`;
      let image = ProfilePicture;
      dispatch("firebaseUploadImage", { path: path, image: image }).then(
        Url => {
          database
            .ref(UserPath)
            .update({
              profilePicture: Url
            })
            .then(snapshot => {
              commit("setAfterRegisterLoadings", false);
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        }
      );
    });
  },
  firebaseUpdateCoverPicture({ commit, dispatch, rootState }, ProfilePicture) {
    return new Promise((reject, resolve) => {
      commit("setAfterRegisterLoadings", true);
      let path = `CoverPictures/${rootState.AuthStore.userCredential.UserId}`;
      let UserPath = `Users/${rootState.AuthStore.userCredential.UserId}`;
      let image = ProfilePicture;
      dispatch("firebaseUploadImage", { path: path, image: image }).then(
        Url => {
          database
            .ref(UserPath)
            .update({
              coverPicture: Url
            })
            .then(snapshot => {
              commit("setAfterRegisterLoadings", false);
              resolve(true);
            })
            .catch(error => {
              reject(error);
            });
        }
      );
    });
  },
  getProfileInfo({ rootState, commit }, profileId) {
    commit("setProfileOwner", {
      profileId: profileId,
      currentUserId: rootState.AuthStore.userCredential.UserId
    });
    let Ref = database.ref("Users/" + profileId);
    Ref.once("value").then(SnapShot => {
      let ProfileInfo = SnapShot.val();
      commit("setProfileInfos", ProfileInfo);
    });
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
