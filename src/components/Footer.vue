<template>
    <footer :style="{ backgroundColor: footerColor }" class="Footer">
      <p>
        <span v-for="(text, index) in footerTextsList" :key="index">
          {{ text }}
          <span v-if="index < footerTextsList.length - 1" class="spacer">|</span>
        </span>
      </p>
    </footer>
  </template>
  
  <script setup>
  import { useAppSettings } from '@/useAppSettings';
  
  const { footerColor, footerTextsList } = useAppSettings('ko');
  </script>
  
  <style scoped>
  .Footer {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    color: #5d4037;
    background-color: #ffe0b2;
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 50px; 
  }
  
  .spacer {
    margin: 0 0.5rem;
  }
  </style>
  