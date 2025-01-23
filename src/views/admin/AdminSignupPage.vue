<template>
  <div class="container">
    <h1 class="title" @click="goToHome">회원가입</h1>
    <div class="form">
      <div class="form-group">
        <label for="staff_email">이메일</label>
        <input
          v-model="staff_email"
          type="email"
          id="staff_email"
          class="input"
          placeholder="이메일 입력"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="input"
          placeholder="비밀번호 입력"
          required
        />
      </div>
      <div class="form-group">
        <label for="agency_name">소속명</label>
        <input
          v-model="agency_name"
          type="text"
          id="agency_name"
          class="input"
          placeholder="소속명 입력 (선택)"
        />
      </div>
      <div class="form-group">
        <label for="staff_name">이름</label>
        <input
          v-model="staff_name"
          type="text"
          id="staff_name"
          class="input"
          placeholder="이름 입력 (선택)"
        />
      </div>
      <div class="form-group">
        <label for="staff_number">연락처</label>
        <input
          v-model="staff_number"
          type="text"
          id="staff_number"
          class="input"
          placeholder="연락처 입력 (선택)"
        />
      </div>
      <button @click="signUp" class="submit-button">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const staff_email = ref('')
const password = ref('')
const agency_name = ref('')
const staff_name = ref('')
const staff_number = ref('')
const pause = ref(0)
const contact_period = ref(0)
const deceased = ref(0)

const router = useRouter()

async function signUp() {
  try {
    await axios.post('http://localhost:8080/admin/signup', {
      staff_email: staff_email.value,
      password: password.value,
      agency_name: agency_name.value,
      staff_name: staff_name.value,
      staff_number: staff_number.value,
      pause: pause.value,
      contact_period: contact_period.value,
      deceased: deceased.value
    })
    alert('회원가입에 성공했습니다. 환영합니다!.')
    router.push('/login')
  } catch (error) {
    console.error('회원가입에 실패했습니다. 입력하신 정보를 다시 확인해 주세요:', error)
    alert(
      '회원가입에 실패했습니다. 입력하신 정보를 다시 확인해 주세요.: ' +
        (error.response?.data?.message || '서버 오류')
    )
  }
}

function goToHome() {
  router.push('/')
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #e0e0e0;
}

.submit-button {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
