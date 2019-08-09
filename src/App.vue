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

#app{
  height: 100%;;
}

body {
  background-image: url('./assets/chat-background.png');
  background-repeat: repeat;
}
</style>
