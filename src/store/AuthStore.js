import { Auth, database, LOCAL } from "boot/firebase";
import Vue from "vue";

// Global Variables
let MessagesRef;

//where the auth data goes
const state = {
  userCredential: {},
  otherUserCredential: {},
  Users: {},
  chatMessages: {},
  LoginRegisterLoading: false
};

//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setUserCredential(state, payload) {
    state.userCredential = payload;
  },
  setOtherUserCredential(state, payload) {
    state.otherUserCredential = payload;
  },
  addUser(state, payload) {
    Vue.set(state.Users, payload.UserId, payload.User);
  },
  updateUser(state, payload) {
    Object.assign(state.Users[payload.UserId], payload.User);
  },
  setChatMessages(state, payload) {
    Vue.set(state.chatMessages, payload.messageId, payload.messageDetails);
  },
  clearChatMessages(state) {
    state.chatMessages = {};
  },
  sendMessage(state, payload) {
    Vue.set(state.chatMessages, payload.newMessage.newMessageId, {
      time: new Date(),
      from: "me",
      text: payload.newMessage.newMessageDetails.text
    });
  },
  deleteMessage(state, payload) {
    Vue.delete(state.chatMessages, payload.messageId);
  },
  setLoginRegisterLoading(state, bool) {
    state.LoginRegisterLoading = bool;
  },
  setUsers(state) {
    state.Users = {};
  }
};

//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  UpdateUser({}, payload) {
    database.ref("Users/" + payload.uid).update(payload.updates);
  },
  RegisterUser({ commit, dispatch }, payload) {
    commit("setLoginRegisterLoading", true);
    Auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(userCredential => {
        console.log(userCredential);
        console.log(userCredential.user);
        // Signed in
        let uid = userCredential.user.uid;
        database.ref("Users/" + uid).set({
          email: payload.email,
          name: payload.name,
          online: true,
          lastSeen: Date.now(),
          profilePicture:
            "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg",
          coverPicture:
            "https://xkonti.tech/assets/static/quasar-love-typescript-bkg.97c148e.0f2056080f14f83608277f542d79fc77.webp"
        });
        database.ref("Users/" + uid).once("value", snapshot => {
          let UserDetails = snapshot.val();
          commit("setUserCredential", {
            name: UserDetails.name,
            email: UserDetails.email,
            UserId: uid,
            coverPicture: UserDetails.coverPicture,
            lastSeen: UserDetails.lastSeen,
            online: UserDetails.online,
            profilePicture: UserDetails.profilePicture
          });
          dispatch("firebaseGetUsers");
          commit("setLoginRegisterLoading", false);
          this.$router.push({ name: "AfterRegister" });
        });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  },
  LoginUser({ commit, dispatch }, payload) {
    commit("setLoginRegisterLoading", true);
    Auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(userCredential => {
        //handled by onAuthChanged
        this.$router.push({ name: "Users" });
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  },
  HandleAuthStateChange({ commit, dispatch, state }) {
    Auth.onAuthStateChanged(user => {
      if (user) {
        console.log("This is what u see on cl => ", user);
        let uid = user.uid;
        database.ref("Users/" + uid).once("value", snapshot => {
          let UserDetails = snapshot.val();
          commit("setUserCredential", {
            name: UserDetails.name,
            email: UserDetails.email,
            UserId: uid,
            coverPicture: UserDetails.coverPicture,
            lastSeen: UserDetails.lastSeen,
            online: UserDetails.online,
            profilePicture: UserDetails.profilePicture
          });
          dispatch("UpdateUser", {
            uid: uid,
            updates: {
              online: true
            }
          });
          dispatch("firebaseGetUsers");
          commit("setLoginRegisterLoading", false);
        });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
      } else {
        // User is signed out
        // ...
        this.$router.push({ name: "Login" });
      }
    });
  },
  LogOutUser({ state, dispatch, commit }) {
    Auth.signOut();
    if (state.userCredential.UserId) {
      dispatch("UpdateUser", {
        uid: state.userCredential.UserId,
        updates: {
          online: false,
          lastSeen: new Date()
        }
      });
    }
    commit("setUserCredential", {});
    commit("setUsers");
  },
  firebaseGetUsers({ commit }) {
    database.ref("Users").on("child_added", snapshot => {
      let User = snapshot.val();
      let UserId = snapshot.key;
      commit("addUser", {
        UserId,
        User
      });
    });
    database.ref("Users").on("child_changed", snapshot => {
      let User = snapshot.val();
      let UserId = snapshot.key;
      commit("updateUser", {
        UserId,
        User
      });
    });
  },
  firebaseGetMessages({ state, commit }, otherUserId) {
    MessagesRef = database.ref(
      "Chats/" + state.userCredential.UserId + "/" + otherUserId
    );

    MessagesRef.on("child_added", snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("setChatMessages", { messageDetails, messageId });
    });
    MessagesRef.on("child_changed", snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("setChatMessages", { messageDetails, messageId });
    });
    MessagesRef.on("child_removed", snapshot => {
      let messageId = snapshot.key;
      commit("deleteMessage", { messageId });
    });
    commit("setOtherUserCredential", state.Users[otherUserId]);
  },
  firebaseStopeGettingMessages({ commit }) {
    MessagesRef.off("child_added");
    commit("clearChatMessages");
  },
  firebaseSendMessage({ commit }, newMessage) {
    // commit("sendMessage", { newMessage });
    let theNewMessage = {
      from: "them",
      text: newMessage.newMessageDetails.text,
      time: Date.now()
    };
    let myNewMessage = {
      from: "me",
      text: newMessage.newMessageDetails.text,
      time: Date.now()
    };
    let Ref1 = database.ref(
      "Chats/" + state.userCredential.UserId + "/" + newMessage.otherUserId
    );
    let Ref2 = database.ref(
      "Chats/" + newMessage.otherUserId + "/" + state.userCredential.UserId
    );
    Ref1.push(myNewMessage);
    Ref2.push(theNewMessage);
  },
  async getUser({ state }, key) {
    console.log("this is tha await getUser");
    let User = state.Users[key];
    return User;
  }
};

//methods to get data from state object and make availible in vue components
const getters = {
  Users: state => {
    let offline = {};
    let online = {};
    Object.keys(state.Users).forEach(key => {
      if (key != state.userCredential.UserId) {
        if (state.Users[key].online) {
          online[key] = state.Users[key];
        } else {
          offline[key] = state.Users[key];
        }
      }
    });

    return { offline, online };
  },
  isAuthenticated: state => {},
  isAuth: state => {
    if (state.userCredential) {
      return true;
    }
    return false;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
