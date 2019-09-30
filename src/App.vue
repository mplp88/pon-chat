<template>
  <div id="app">
    <Chat></Chat>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
  },
  mounted: function() {
    if(Notification.permission !== 'denied'){
      Notification.requestPermission();
    }
  }
}
</script>

<style>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  height: 100%;
}

#app {
  background-image: url("./assets/chat-background.png");
  background-repeat: repeat;
}

@media only screen and (max-width: 999px) {
  #app {
    height: 100%;
    width: 100%;
    margin: auto;
  }
}

@media only screen and (min-width: 1000px) {
  #app {
    height: 90%;
    width: 80%;
    margin: 10px auto;
    box-shadow: 2px 2px 15px 5px;
  }
}
</style>
