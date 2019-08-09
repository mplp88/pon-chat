<template>
  <div id="chat-cont">
    <div v-if="!user.userName">
      <div class="row">
        <input class="form-control col-2 offset-5" type="text" v-model="userName">
      </div>
      <div class="row">
        <input class="btn btn-secondary col-2 offset-5" type="button" @click="setUserName" value="Asignar nombre de usuario"/>
      </div>
    </div>
    <div v-else>
      <div id="contacts-container">

      </div>
      <div id="messages-container">
        <div v-if="!isConnected">
          <h3>Intentando reconectar...</h3>
        </div>
        <div id="messages" v-else>
          <div id="chat">
            <Message v-for="message in chat" :key="message.id" :message="message" :user="user" />
          </div>
          <form id="message-form" @submit.prevent="send">
            <input id="message-text" v-model="message.text" autocomplete="off" placeholder="Escribe un mensaje aquí..." />
            <button type="submit" id="message-send"><i class="fas fa-angle-right"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import Message from "./Message";

export default {
  data: function() {
    return {
      isConnected: false,
      useName: '',
      chat: [],
      user: {
        id: -1,
        userName: ''
      },
      message: {
        id: '',
        userId: "1",
        userName: '',
        text: "",
        incoming: false
      }
    };
  },
  components: {
    Message
  },
  methods: {
    send: function() {
      let vm = this;
      vm.message.id = `${vm.user.id}_${vm.chat.length}`;
      vm.message.userId = vm.user.id;
      vm.message.userName = vm.user.userName;
      vm.$socket.emit('chatMessage', vm.message);
      vm.message.text = '';
    },
    receive: function(msg) {
      let vm = this;
      vm.chat.push(msg); 
      setTimeout(function() {window.scrollTo(0, document.getElementById('messages').scrollHeight+1000), 1000});
    },
    setUserName: function() {
      let vm = this;
      
      if(this.userName != null && this.userName != '') {
        vm.user.id = Math.round(Math.random()*10000);
        vm.user.userName = this.userName;
        vm.$socket.emit('userConnected', this.userName);

        setTimeout(function() {
          document.getElementById('message-text').focus();
        }, 1000);
      }
    },
    disconnectUser: function() {
      let vm = this;

      vm.$socket.emit('userDisconnected', vm.user.userName);
    }
  },
  sockets: {
    connect: function() {
      this.isConnected = true;
    },
    disconnect: function() {
      this.isConnected = false;
    },
    userConnected: function(message) {
      this.receive(message);
    },
    userDisconnected: function(message) {
      this.receive(message);
    },
    chatMessage: function(message) {
      this.receive(message);
    }
  },
  created: function() {
    window.addEventListener('beforeunload', this.disconnectUser);
  }
};
</script>

<style scoped>
#chat-cont, #messages-container, #contacts-container {
  height: 100%;
}

#messages-container {
  width:75%;
  margin:auto;
  position:absolute;
  right:0px;
}

#contacts-container {
  background: #FFF;
  width:25%;
  margin:auto;
  position:absolute;
  left:0px;
}

#message-form {
  background-color: #EFEFEF;
  margin: auto;
  display: block;
  padding: 10px;
  position: relative;
  width: 100%;
  height: 10%;
}

#message-text {
  position: absolute;
  text-align: left;
  outline: none;
  bottom:0px;
  left:0px;
  border: none;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
  height: 50px;
  width:90%;  
}

#message-send {
  position:absolute;
  right: 2%;
  bottom: 0px;
  width:50px;
  height:50px;
  margin: 10px;
  padding:10px;
  background: #128C7E;
  border: none;
  border-radius: 50%;
}

svg {
  color: #FFF;
}

#messages {
  display: block;
  height: 100%;
  overflow: auto;
  padding-top: 10px;
}

#chat {
  display: block;
  height: 90%;
  overflow: auto;
  padding-top: 10px;
  padding-bottom: 5%;
}
</style>
