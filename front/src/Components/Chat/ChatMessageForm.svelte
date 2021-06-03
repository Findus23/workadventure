<script lang="ts">
    import {chatMessagesStore, chatInputFocusStore} from "../../Stores/ChatStore";

    let newMessageText = '';
    
    function onFocus() {
        chatInputFocusStore.set(true);
    }
    function onBlur() {
        chatInputFocusStore.set(false);
    }

    function saveMessage() {
        chatMessagesStore.addPersonnalMessage(newMessageText);
        newMessageText = '';
    }
</script>

<form on:submit|preventDefault={saveMessage}>
    <input type="text" bind:value={newMessageText} placeholder="Type here" on:focus={onFocus} on:blur={onBlur} ><button type="submit">Send</button>
</form>

<style>
    form {
        font-family: 'Press Start 2P';
    }
</style>