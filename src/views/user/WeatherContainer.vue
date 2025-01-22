<template>
    <div :class="['weather-container', backgroundClass]">
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const backgroundClass = ref('clearD');
  
  </script>
  
  <style scoped>
  .weather-container {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .clearD {
  background: url('@/assets/image/clearD_sample.webp') no-repeat center center;
  background-size: cover;
}
.clearN {
  background: url('@/assets/image/clearN_sample.webp') no-repeat center center;
  background-size: cover;
}
.cloudsD {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}
.cloudsN {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}
.brokenCloudsD {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}
.brokenCloudsN {
  background: url('@/assets/image/sample_made.png') no-repeat center center;
  background-size: cover;
}
.rainD {
  background: url('@/assets/image/rainD_sample.webp') no-repeat center center;
  background-size: cover;
}
.rainN {
  background: url('@/assets/image/rainD_sample.webp') no-repeat center center;
  background-size: cover;
}
.snowD {
  background: url('@/assets/image/snowD_sample.webp') no-repeat center center;
  background-size: cover;
}
.snowN {
  background: url('@/assets/image/snowD_sample.jpeg') no-repeat center center;
  background-size: cover;
}
.mistD {
  background: url('@/assets/image/mistD_sample.jpeg') no-repeat center center;
  background-size: cover;
}
.mistN {
  background: url('@/assets/image/mistD_sample.webp') no-repeat center center;
  background-size: cover;
}
.default {
  background: url('@/assets/image/clearD.webp') no-repeat center center;
  background-size: cover;
}
  </style>
  