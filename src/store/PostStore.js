import { database, storage, firestore } from "boot/firebase";
import { uid } from "quasar";
import Vue from "vue";

// Global Variables
let tempUrls = [];
let postsRef = "";
//where the auth data goes
const state = {
  profilePosts: {},
  allPosts: {},
  postUploading: false
};

//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setPostUploading(state, payload) {
    state.postUploading = payload;
  },
  setProfilePosts(state, payload) {
    // console.log("here we set Posts with ", payload);
    Vue.set(state.profilePosts, payload.postId, payload.post);
  },
  clearProfilePosts(state) {
    // console.log("here we clear Posts with ");
    state.profilePosts = {};
  },
  likePost(state, payload) {
    if (!state.profilePosts[payload.postKey].Likes) {
      Vue.set(state.profilePosts[payload.postKey], "Likes", []);
    }
    let postLikes = state.profilePosts[payload.postKey].Likes;
    if (!postLikes.includes(payload.currentUserId)) {
      postLikes.push(payload.currentUserId);
    } else {
      postLikes.splice(postLikes.indexOf(payload.currentUserId), 1);
    }
  }
};

//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  firebaseUploadPostImages({ commit }, postImages) {
    return new Promise((resolve, reject) => {
      let uploadedImages = 0;
      postImages.forEach(img => {
        let path = `PostPictures/${uid()}`;
        let storageRef = storage.ref(path).put(img);
        storageRef.on(
          `state_changed`,
          snapshot => {},
          error => {
            console.log(error.message);
            reject(error);
          },
          () => {
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              tempUrls.push(url);
              uploadedImages++;
              if (uploadedImages == postImages.length) {
                // console.log("all files uploaded");
                resolve(tempUrls);
              }
            });
          }
        );
      });
    });
  },
  firebaseAddPost({ rootState, commit, dispatch }, post) {
    commit("setPostUploading", true);
    dispatch("firebaseUploadPostImages", post.postImages)
      .then(res => {
        firestore
          .collection("Posts")
          .add({
            Author: rootState.AuthStore.userCredential.UserId,
            Description: post.postDescription,
            time: Date.now(),
            Picture: res
          })
          .then(post => {
            console.log(post.id);
            tempUrls = [];
            commit("setPostUploading", false);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  firebaseGetProfilePosts({ commit }, profileId) {
    console.log("firebaseGetProfilePosts M CALLED BABY ");
    postsRef = firestore
      .collection("Posts")
      .where("Author", "==", profileId)
      .orderBy("time", "desc");

    postsRef.onSnapshot(response => {
      response.docs.forEach(post => {
        firestore
          .collection("Posts")
          .doc(post.id)
          .get()
          .then(ss => {
            commit({
              type: "setProfilePosts",
              postId: post.id,
              post: ss.data()
            });
          });
      });
      // console.log("recieved Snapshot", response.docs, response.val);
    });
  },
  firebaseClearProfilePost({ commit }) {
    commit("clearProfilePosts");
    let unsub = postsRef.onSnapshot();
    unsub();
  },
  firebaseProfileLikePost({ commit, state, rootState }, postKey) {
    // console.log("postKey => ", postKey);
    commit("likePost", {
      postKey: postKey,
      currentUserId: rootState.AuthStore.userCredential.UserId
    });
    let postLikes = state.profilePosts[postKey].Likes;
    // console.log(postLikes);
    firestore
      .collection("Posts")
      .doc(postKey)
      .update({
        Likes: postLikes
      });
  }
};

//methods to get data from state object and make availible in vue components
const getters = {
  getCarousels: state => {
    const carsouels = [];
    for (const post in state.profilePosts) {
      if (state.profilePosts[post].Picture.length > 1) {
        carsouels[post] = { slide: 0, fullscreen: false };
        carsouels.push({ slide: 0, fullscreen: false });
      }
    }
    return carsouels;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
