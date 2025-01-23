<template>
  <div class="mooluck-container">
    <img
      class="interactive-video"
      src="@/assets/video/mooluck_gif.gif"
      :class="{ 'water-mode': isWaterTime }"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
      @click.stop="handleClick"
      :style="{ cursor: isWaterTime ? waterCursor : 'pointer' }"
    />
    <p class="instruction" v-if="!isWaterTime">🌱무럭이를 쓰다듬어주세요🌱</p>
    <p v-else class="water-mode-instruction">💧무럭이에게 물을 주세요💧</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isWaterTime: {
    type: Boolean,
    required: true
  },
  waterCursor: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['handleVideoClick', 'setHover'])

const handleMouseOver = () => {
  emit('setHover', true)
}

const handleMouseLeave = () => {
  emit('setHover', false)
}

const handleClick = () => {
  emit('handleVideoClick')
}
</script>

<style scoped>
.interactive-video {
  width: 300px;
  border: none;
  display: block;
  margin: 0 auto;
  pointer-events: auto;
}

.instruction {
  color: #f6e5d6;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'HakgyoansimDunggeunmisoTTF-B', 'Comic Sans MS', 'Arial', sans-serif;
  margin-top: 15px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.05em;
  text-transform: capitalize;
  -webkit-text-stroke: 2px #6e6e6e;
}

.water-mode-instruction {
  color: #ffffff;
  font-size: 2.4rem;
  font-weight: bold;
  font-family: 'HakgyoansimDunggeunmisoTTF-B', 'Comic Sans MS', 'Arial', sans-serif;
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.05em;
  text-transform: capitalize;
  -webkit-text-stroke: 2px #6e6e6e;
}

.mooluck-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
