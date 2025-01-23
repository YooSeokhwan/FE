import { ref } from 'vue'

export const showPopup = ref(false)
export const popupMessage = ref('')

export const openPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
  setTimeout(() => {
    showPopup.value = false
  }, 5000)
}

export const closePopup = () => {
  showPopup.value = false
}
