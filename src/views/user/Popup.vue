<template>
    <div class="popup" @click="$emit('close')">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['close'])
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    animation: fadeInOut 5s forwards;
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
  