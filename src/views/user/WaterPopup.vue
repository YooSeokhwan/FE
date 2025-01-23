<template>
  <div class="water-popup" @click="$emit('close')">
    <p class="popup-title">💧물이 필요해요💧</p>
    <p class="popup-message">
      "무럭이 목말라요!" <br />
      지금 바로 무럭이에게 물을 주세요
    </p>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
</script>

<style scoped>
.water-popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem;
  border-radius: 15px;
  background-color: #e3f2fd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #1e88e5;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1551;
  cursor: url('@/assets/water_cursor.png'), pointer;
  animation: fadeInOut 5s forwards;
}

.popup-title {
  margin-bottom: 10px;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
