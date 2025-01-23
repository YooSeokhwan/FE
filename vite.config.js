import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools' // DevTools 플러그인 추가

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    global: 'window' // global을 window로 정의하여 브라우저 환경에서 global을 인식하도록 설정
  },
  server: {
    proxy: {
      '/ws-alert': {
        target: 'http://localhost:8080', // WebSocket 요청 처리
        changeOrigin: true,
        ws: true // WebSocket 프록시 활성화
      },
      '/api': {
        target: 'http://localhost:8080', // API 요청 처리
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // /api를 제거하고 백엔드로 전달
      },
      '/ai': {
        target: 'http://localhost:5050', // API 요청 처리
        changeOrigin: true
      }
    }
  }
})
