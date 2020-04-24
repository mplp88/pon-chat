<template>
  <div class="message">
    <div class="chat-bubble" :class="{ incoming: incoming, broadcast: message.isBroadcast }">
      <span v-if="!message.isBroadcast" class="username">{{ message.userName }}:</span>
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "user"],
  computed: {
    incoming: function() {
      let vm = this;
      return vm.message.userId != vm.user.id && !vm.message.isBroadcast;
    }
  }
};
</script>

<style>
.message {
  display: inline-block;
  width: 100%;
  word-break: break-word;
}

.chat-bubble {
  padding: 5px 10px 5px 5px;
  margin: 2px 15px 2px 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px;
  min-width: 100px;
  max-width: 350px;
  background-color: #dcf8c6;
  float: right;
  text-align: right;
}

.chat-bubble.incoming {
  text-align: left;
  float: left;
  background-color: #ece5dd;
}

.chat-bubble span.username {
  color: #777;
  font-weight: 700;
  display: block;
  text-align: left;
  margin-left: 5px;
}

.chat-bubble.broadcast {
  max-width: 350px;
  margin: auto;
  text-align: center;
  background-color: #ece5dd;
  float: none;
  margin-bottom: 10px;
}
</style>
