<template>
  <div>
    <div v-if="!user.userName">
      <input type="button" @click="setUserName" value="Asignar nombre de usuario"/>
    </div>
    <div id="messages-container" v-else>
      <div id="messages">
        <Message v-for="message in chat" :key="message.id" :message="message" :user="user" />
      </div>
      <form @submit.prevent="send">
        <input id="message-text" v-model="message.text" autocomplete="off" />
        <button>&rarr;</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import swal from 'sweetalert'
import Message from "./Message";

export default {
  data: function() {
    return {
      chat: [],
      user: {
        id: -1,
        userName: ''
      },
      message: {
        id: 0,
        userId: "1",
        userName: '',
        text: "",
        incoming: false
      },
      socket: {}
    };
  },
  components: {
    Message
  },
  methods: {
    send: function() {
      let vm = this;
      vm.message.id += 1;
      vm.message.userId = vm.user.id;
      vm.message.userName = vm.user.userName;
      vm.socket.emit('chat message', vm.message);
      vm.message.text = '';
    },
    receive: function(msg) {
      let vm = this;
      vm.chat.push(msg); 
      setTimeout(function() {window.scrollTo(0, document.getElementById('messages').scrollHeight+1000), 1000});
    },
    setUserName: function() {
      let vm = this;

      swal({
        title: 'Elija nombre de usuario',
        content: { 'element': 'input' }
      })
        .then(userName => {
          if(userName != null) {
            vm.user.id = Math.round(Math.random()*10000);
            vm.user.userName = userName;
            vm.socket.emit('connected', userName);

            setTimeout(function() {
              document.getElementById('message-text').focus();
            }, 1000);
          }
        })
        .catch(err => swal('Error', ''+err, 'error'));
    }
  },
  mounted: function() {
    let vm = this;
    vm.socket = io.connect("http://192.168.60.140:8082");

    vm.socket.on('connected', vm.receive)
    vm.socket.on("chat message", vm.receive);
  }
};
</script>

<style scoped>
form {
  display: block;
  padding: 10px;
  position: fixed;
  bottom: 10px;
  width: 100%;
  height: 10%;
}

form input {
  border-radius: 25px;
  box-shadow: 2px 2px 5px;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}

form button {
  background: #128C7E;
  border-radius: 50%;
  box-shadow: 2px 2px 5px;
  padding: 10px;
}

#messages {
  display: block;
  height: 90%;
  overflow: auto;
  padding-top: 10px;
  padding-bottom: 5%;
}
</style>
