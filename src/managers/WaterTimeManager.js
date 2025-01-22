import { ref } from 'vue';
export const isWaterTime = ref(false);
let hasGivenWater = false; 
const waterStartTime = '18:00'; 
const waterEndTime = '18:30';  

if (!waterStartTime || !waterEndTime) {
  console.error('waterStartTime 또는 waterEndTime이 정의되지 않았습니다!');
}

export const checkWaterTime = () => {
  const currentTime = new Date();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const [startHour, startMinute] = waterStartTime.split(':').map(Number);
  const [endHour, endMinute] = waterEndTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    if (!isWaterTime.value) {
      console.log('WaterTime 시작됨');
      isWaterTime.value = true;
      hasGivenWater = false;
    }
  } else {
    if (isWaterTime.value) {
      console.log('WaterTime 종료됨');
      isWaterTime.value = false;
      hasGivenWater = false;
    }
  }
};

export const startWaterTimeInterval = () => {
  checkWaterTime();
  setInterval(checkWaterTime, 1000 * 60);
};

export const resetWaterTime = () => {
  console.log('WaterTime 상태 초기화');
  isWaterTime.value = false;
  hasGivenWater = true;
};