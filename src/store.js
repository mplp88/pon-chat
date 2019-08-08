import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    message: {}
  },
  mutations: {
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
  actions: {

  }
})
