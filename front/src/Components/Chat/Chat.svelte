<script lang="ts">
    import { fly } from 'svelte/transition';
    import {chatMessagesStore, chatVisibilityStore} from "../../Stores/ChatStore";
    import ChatMessageForm from './ChatMessageForm.svelte'
    import ChatElement from './ChatElement.svelte'
    
    function closeChat() {
        chatVisibilityStore.set(false);
    }
</script>

<aside class="chatWindow" transition:fly="{{ x: -1000, duration: 500 }}">
    <section class="chatWindowTitle">
        <h3>You can launch a discussion! <button on:click={closeChat}>❌</button></h3>

    </section>
    <section class="messagesList">
        <ul>
        {#each $chatMessagesStore as message}
            <li><ChatElement message={message}></ChatElement></li>
        {/each} 
        </ul>
    </section>
    <section class="messageForm">
        <ChatMessageForm></ChatMessageForm>
    </section>
</aside>

<style lang="scss">
    * {
      font-family: 'Press Start 2P';
    }
    aside.chatWindow {
      z-index:100;
      pointer-events: auto;
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width:30vw;
      background: #858080;
      
      border-bottom-right-radius: 16px;
      border-top-right-radius: 16px;
      
      h3 {
        background-color: #5f5f5f;
        margin: 40px 20px 20px;
        border-radius: 8px;
        font-size: 100%;
      }
      
      .chatWindowTitle {
        height: 20%;
      }
      .messagesList {
        overflow: scroll;
        height: 70%;

        ul {
          list-style-type: none;
          padding-left: 10px;
        }
      }
      .messageForm {
        height: 10%;
      }
    }
</style>