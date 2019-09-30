<template>
  <div id="chat-cont">
    <div v-if="!user.userName" class="container">
      <div class="row">
        <input
          class="form-control text-left"
          type="text"
          v-model="userName"
          style="margin:10px;"
          placeholder="Nombre de usuario..."
        />
      </div>
      <div>
        <input
          class="btn btn-secondary"
          type="button"
          @click="setUserName"
          value="Asignar nombre de usuario"
        />
      </div>
    </div>
    <div v-else>
      <div id="contacts-container">
        <div>
          <span v-if="showMenuIcon" class="contacts-icon">
            <i class="fas fa-bars"></i>
          </span>
          <h2>Conectados</h2>
        </div>
        <div class="contact" v-for="contact in contacts" v-bind:key="contact.id">
          <div class="contact-img">
            <img src="@/assets/noprofile.png" alt="profile photo" />
          </div>
          <div class="contact-info">
            {{ contact.userName }}
            <span v-if="contact.id == user.id">(Yo)</span>
          </div>
        </div>
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
            <input
              id="message-text"
              v-model="message.text"
              autocomplete="off"
              placeholder="Escribe un mensaje aquí..."
            />
            <button type="submit" id="message-send">
              <i class="fas fa-angle-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import swal from 'sweetalert'
import Message from "./Message";

export default {
  data: function() {
    return {
      isConnected: false,
      userName: "",
      chat: [],
      contacts: [],
      user: {
        id: -1,
        userName: "",
        profilePhoto: "assets/noprofile.png"
      },
      message: {
        id: "",
        userId: "1",
        userName: "",
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
      vm.$socket.emit("chatMessage", vm.message);
      vm.message.text = "";
    },
    receive: function(msg) {
      let vm = this;
      vm.chat.push(msg);
      if(msg.userId != vm.user.id) {
        let notif;
        if(msg.isBroadcast) {
          notif = new Notification(msg.text);
        } else {
          notif = new Notification('Nuevo mensaje', {
            body: msg.userName + ': ' + msg.text
          });
        }
      }
      setTimeout(function() {
        let chat = document.getElementById("chat");
        chat.scrollTo(0, chat.scrollHeight + 1000), 1000;
      });
    },
    setUserName: function() {
      let vm = this;

      if (vm.userName != null && vm.userName != "") {
        vm.user.id = Math.round(Math.random() * 10000);
        vm.user.userName = vm.userName;
        vm.$socket.emit("userConnected", vm.user);

        setTimeout(function() {
          document.getElementById("message-text").focus();
        }, 1000);
      }
    },
    disconnectUser: function() {
      let vm = this;

      vm.$socket.emit("userDisconnected", vm.user);
    }
  },
  computed: {
    showMenuIcon: function() {
      return window.innerWidth < 999;
    }
  },
  sockets: {
    connect: function() {
      this.isConnected = true;
    },
    disconnect: function() {
      this.isConnected = false;
    },
    userConnected: function(payload) {
      this.receive(payload.msg);
      this.contacts = payload.contacts;
    },
    userDisconnected: function(payload) {
      this.receive(payload.msg);
      this.contacts = payload.contacts;
    },
    chatMessage: function(message) {
      this.receive(message);
    }
  },
  created: function() {
    window.addEventListener("beforeunload", this.disconnectUser);
  }
};
</script>

<style>
#chat-cont,
#messages-container,
#contacts-container {
  height: 100%;
}

#chat-cont {
  width: 100%;
  position: relative;
  margin: auto;
}

#contacts-container {
  background: #fff;
  box-shadow: 2px 0px 5px;
  margin: auto;
  position: absolute;
  left: 0px;
}

@media only screen and (max-width: 999px) {
  .contacts-icon {
    width: 25px;
    height: 25px;
    display: inline-block;
    line-height: 30px;
  }

  #message-container {
    width: 98%;
  }

  #contacts-container {
    width: 25px;
    height: 25px;
    overflow: hidden;
    z-index: 1;
    -webkit-transition: width 0.5s, height 0.5s;
    transition: width 0.5s, height 0.5s;
  }

  #contacts-container:hover {
    width: 80%;
    height: 100%;
    z-index: 99;
  }
}

@media only screen and (min-width: 1000px) {
  #messages-container {
    width: 75%;
    margin: auto;
    position: absolute;
    right: 0px;
  }

  #contacts-container {
    width: 25%;
    overflow: auto;
  }
}

#message-form {
  background-color: #efefef;
  margin: auto;
  display: block;
  padding: 10px;
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0px;
  z-index: 2;
}

#message-text {
  position: absolute;
  text-align: left;
  outline: none;
  bottom: 0px;
  left: 0px;
  border: none;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
  height: 50px;
  width: 90%;
}

#message-send {
  position: absolute;
  right: 2%;
  bottom: 0px;
  width: 50px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  background: #128c7e;
  border: none;
  border-radius: 50%;
}

svg {
  color: #fff;
}

#messages {
  display: block;
  height: 100%;
  overflow: auto;
  padding-top: 10px;
}

#chat {
  overflow: auto;
  display: block;
  width: 100%;
  height: 88%;
  padding-top: 10px;
  padding-bottom: 5%;
  scroll-behavior: smooth;
  position: absolute;
  top: 5px;
}

.contact {
  position: relative;
  width: 95%;
  height: 10%;
  text-align: left;
  padding: 10px;
  margin: 10px;
}

.contact-info {
  display: block;
  text-align: left;
  position: absolute;
  right: 0px;
  width: 70%;
}

.contact-img {
  position: absolute;
  left: 0px;
  display: block;
  background-color: #f4f4f4;
  width: 20%;
  border-radius: 50%;
}

.contact-img img {
  position: relative;
  display: inline-block;
  height: 25px;
  width: 25px;
  overflow: hidden;
  opacity: 0.7;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #777;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #333;
}
</style>
