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
    props: ['message', 'user'],
    computed: {
        incoming: function() {
            let vm = this;
            return vm.message.userId != vm.user.id && !vm.message.isBroadcast;
        }
    }
}
</script>

<style scoped>
    .message {
        display: inline-block;
        width: 100%;
    }

    .chat-bubble {
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px;
        min-width: 100px;
        max-width: 350px;
        background-color: #DCF8C6;
        float: right;
        text-align: right;
    }

    .chat-bubble.incoming {
        text-align: left;
        float: left;
        background-color: #ECE5DD;
    }

    .chat-bubble span.username {
        color: #777;
        font-weight: 700;
        display: block;
        text-align: left;
        margin-left: 5px;
    }

    .chat-bubble.broadcast {
        max-width: 50;
        margin: auto;
        text-align: center;
        background-color: #ECE5DD;
        float:none;
        margin-bottom: 10px;
    }
</style>
