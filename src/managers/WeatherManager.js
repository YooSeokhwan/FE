import { ref } from 'vue'
import axios from 'axios'

export const weatherDescription = ref('')
export const backgroundClass = ref('')

export const fetchWeather = async () => {
  try {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const response = await axios.get(
          `http://localhost:8080/api/weather?lat=${latitude}&lon=${longitude}`
        )
        console.log('위도 :' + latitude + ' / 경도 :' + longitude)
        const weatherIcon = response.data.response.data.weatherIcon
        weatherDescription.value = getWeatherDescription(weatherIcon)
        console.log('현재 거주지 날씨 : ' + weatherDescription.value)
        setBackground(weatherIcon)
      },
      (error) => console.error('위치 권한 거부:', error.message)
    )
  } catch (error) {
    console.error('날씨 데이터 오류:', error)
  }
}

const getWeatherDescription = (icon) => {
  const weatherMapping = {
    '01': 'Clear',
    '02': 'Clouds',
    '03': 'Clouds',
    '04': 'Broken Clouds',
    '09': 'Rain',
    '10': 'Rain',
    '11': 'Rain',
    '13': 'Snow',
    '50': 'Mist'
  }
  const code = icon.slice(0, 2)
  return weatherMapping[code] || 'Default'
}

const setBackground = (icon) => {
  const code = icon.slice(0, 2)
  const dayNight = icon.endsWith('d') ? 'D' : 'N'
  const backgroundMapping = {
    '01': `clear${dayNight}`,
    '02': `clouds${dayNight}`,
    '03': `clouds${dayNight}`,
    '04': `brokenClouds${dayNight}`,
    '09': `rain${dayNight}`,
    '10': `rain${dayNight}`,
    '11': `rain${dayNight}`,
    '13': `snow${dayNight}`,
    '50': `mist${dayNight}`
  }
  backgroundClass.value = backgroundMapping[code] || 'default'
}
