<template>
  <div :class="['weather-container', backgroundClass, { 'water-mode-cursor': isWaterTime }]">

    <MooluckContainer 
      :isWaterTime="isWaterTime" 
      :waterCursor="waterCursor" 
      @handleVideoClick="handleVideoClick"
      @setHover="setHover"
    />
    <ChatContainer 
      :chatMessages="chatMessages" 
      @startChat="startChat" 
    />
    <WaterPopup v-if="showWaterPopup" @close="closeWaterPopup" />
    <Popup v-if="showPopup" :message="popupMessage" />
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import MooluckContainer from './MooluckContainer.vue'
import ChatContainer from './ChatContainer.vue'
import Popup from './Popup.vue'
import WaterPopup from './WaterPopup.vue'
import { isWaterTime, checkWaterTime, startWaterTimeInterval } from '@/managers/WaterTimeManager'
import { showPopup, popupMessage, openPopup } from '@/managers/PopupManager'
import { fetchWeather, backgroundClass } from '@/managers/WeatherManager'
import { useRouter } from 'vue-router';
import axios from 'axios'

const waterCursor = `url(${new URL('@/assets/water_cursor.png', import.meta.url).href}), pointer`;
const elderId = ref("1")
const showWaterPopup = ref(false)
let hasGivenWater = false; 
const chatMessages = ref([])
const isHovering = ref(false)

const setHover = (hover) => {
  isHovering.value = hover
  document.body.style.cursor = hover
    ? `url(${new URL('@/assets/pet_cursor.png', import.meta.url).href}), pointer`
    : 'default'
}

const router = useRouter();
const ELDER_TOKEN_KEY = 'elder_token';

onMounted(async () => {
  const token = localStorage.getItem(ELDER_TOKEN_KEY);

  if (!token) {
    alert('다시 로그인 해주세요.');
    router.push('/');
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/auth/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status !== 200 || response.data !== 'Token is valid') {
      throw new Error('유효하지 않은 토큰입니다.');
    }

  } catch (error) {
    console.error('토큰 검증 실패:', error.message);
    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    localStorage.removeItem(ELDER_TOKEN_KEY);
    router.push('/');
  }
});


const startChat = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5050/interaction/pet',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const {  recognized_text,answer } = response.data;
    chatMessages.value.push(`문희: ${ recognized_text}`);
    chatMessages.value.push(`무럭이: ${answer}`);

    openPopup(response.data.message);
  } catch (error) {
    console.error('대화 중 오류 발생:', error);
    chatMessages.value.push('무럭이와 대화에 실패했어요 😭');
    openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭');
  }
};

const handleWaterInteraction = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/interaction/water',
      { elderId: elderId.value },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    console.log('물 주기 API 응답:', response.data);
    openPopup('무럭이에게 물을 주었어요💧무럭이가 아주 좋아해요🌱');
  } catch (error) {
    handleApiError(error); 
  }
};

const handlePetInteraction = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/interaction/pet',
      { elderId: elderId.value },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    console.log('쓰다듬기 API 응답:', response.data);
    openPopup('무럭이를 쓰다듬었어요✨ 무럭이가 행복해하고 있어요💚');
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    console.error('서버에서 에러 응답을 반환했습니다:', error.response.data);
  } else if (error.request) {
    console.error('요청은 보내졌지만 응답을 받지 못했습니다:', error.request);
  } else {
    console.error('요청 중 에러가 발생했습니다:', error.message);
  }
  openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭');
};

const handleVideoClick = async () => {

  if (!elderId.value) {
    openPopup('elderId가 설정되지 않았습니다. 다시 시도해 주세요.');
    return;
  }

  if (isWaterTime.value && !hasGivenWater) {
    await handleWaterInteraction();
    hasGivenWater = true; 
  } else if (!isWaterTime.value) {
    await handlePetInteraction();
  } else {
    openPopup('무럭이는 이미 물을 받았어요 💧');
  }

  if (isWaterTime.value && hasGivenWater) {
    isWaterTime.value = false; 
  }
};

if (isWaterTime.value && hasGivenWater) {
  isWaterTime.value = false;
}

const closeWaterPopup = () => {
  if (showWaterPopup.value) {
    showWaterPopup.value = false;
  }
};


watch(isWaterTime, (newVal) => {
  showWaterPopup.value = newVal;
});


onMounted(() => {
  fetchWeather()
  checkWaterTime()
  startWaterTimeInterval()
})
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
body {
  cursor: url('@/assets/pet_cursor.png'), pointer !important;
}
</style>
