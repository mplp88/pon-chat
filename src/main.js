import Vue from 'vue'
import App from './App.vue'
import store from './store'
import io from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'

Vue.config.productionTip = false
export const SocketInstance = io('http://192.168.60.140:8082');

Vue.use(new VueSocketIo({
  debug: true,
  connection: SocketInstance,
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}), store)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
