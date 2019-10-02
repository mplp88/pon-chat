import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const user = getUserFromLS();

function createNewUser() {
  return {
    id: -1,
    userName: "",
    profilePhoto: "assets/noprofile.png"
  }
}

function getUserFromLS() {
  let u = JSON.parse(window.localStorage.getItem('user'));
  if (u == null) {
    u = createNewUser();
  }
  return u;
}

export default new Vuex.Store({
  state: {
    user: user,
    isConnected: false,
    message: {}
  },
  mutations: {
    setUser(state, user) {
      window.localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },

    disconnectUser(state) {
      window.localStorage.removeItem('user');
      state.user = createNewUser();
    },

    SOCKET_CONNECT(state, message) {
      state.isConnected = true;
      state.message = message;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_CHATMESSAGE(state, message) {
      state.message = message
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  },
  actions: {

  }
})