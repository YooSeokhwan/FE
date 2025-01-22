<template>
  <div class="chat-container">
    <p>
      <button @click="startChat" class="chat-button">
        🎙️ 무럭이와 함께 대화해요! 저를 눌러주세요! 🎙️
      </button>
    </p>
    <div class="mooluck-chat">
      <div class="chat-box">
        <img src="@/assets/chatbot.png" alt="Chatbot" class="chat-bg" />
        <div class="chat-content">
          <p v-for="(message, index) in displayedMessages" :key="message.id">
            <strong>{{ message.text }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue'

const props = defineProps({
  chatMessages: {
    type: Array,
    required: true,
  },
});




const emit = defineEmits(['startChat']);

const displayedMessages = ref([]);

const resetMessages = () => {
  setTimeout(() => {
    displayedMessages.value = [{ text: '궁금한 것을 물어보세요!!.', id: Date.now() }];
  }, 4000);
};

const startChat = () => {
  displayedMessages.value = [];

  emit('startChat');


  addMessage('궁금한 것을 물어보세요!');
};

const addMessage = (message) => {
  const id = Date.now() + Math.random();
  const messageObj = { text: message, id };

  displayedMessages.value = [messageObj];


  resetMessages();
};

watch(
  () => props.chatMessages,
  (newMessages) => {
    newMessages.forEach((message) => addMessage(message));
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-box {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: auto;
  margin: 20px auto;
  border-radius: 15px;
  overflow: hidden;
}

.chat-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  z-index: 1;
}

.chat-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 23px;
  font-family: Arial, sans-serif;
  background: transparent;
  text-align: center;
}

.chat-button {
  background-color: #ffecb3;
  color: #ff7043;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #ffab91;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.chat-button:hover {
  background-color: #ffe0b2;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.chat-button:active {
  background-color: #ffcc80;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transform: translateY(1px);
}
</style>
