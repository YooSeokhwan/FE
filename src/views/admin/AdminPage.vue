<template>
  <div>
    <h1>Mooluck</h1>
    <div>담당 독거노인 현황입니다.</div>

    <!-- 우상단 아이콘 버튼 -->
    <div class="button-container">
      <button class="btn btn-outline-secondary icon-button" @click="openSettings">
        <i class="bi bi-gear"></i>
      </button>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <canvas id="interactionBarChart"></canvas>
    </div>

    <!-- 테이블 영역 -->
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>주소</th>
          <th>전화번호</th>
          <th>상태</th>
          <th>상호작용 횟수</th>
          <th>마지막 체크인</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in records"
          :key="record.elderId"
          @click="rowClickHandler(index)"
        >
          <td>
            <input v-if="editIndex === index" v-model="record.elderId" />
            <span v-else>{{ record.elderId }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.elderName" />
            <span v-else>{{ record.elderName }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.elderAddress" />
            <span v-else>{{ record.elderAddress }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.elderNumber" />
            <span v-else>{{ record.elderNumber }}</span>
          </td>

          <td>
            <input v-if="editIndex === index" v-model="record.status" />
            <span v-else>{{ record.status }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.totalCount" type="number" />
            <span v-else>{{ record.totalCount }}</span>
          </td>
          <td>
            <span>{{ record.lastCheckIn }}</span>
          </td>
          <td>
            <button v-if="editIndex === index" @click="updateRecord(index)">저장</button>
            <button v-else @click="startEditing(index)">수정</button>
            <button @click="deleteRecord(index)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="fetchData(1)">데이터 불러오기</button>
    <button @click="logoutHandler">로그아웃</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { login } from '@/stores/login'
import { logout } from '@/stores/logout'

const records = ref([])
const editIndex = ref(null)
let barChart = null

const router = useRouter()
const ADMIN_TOKEN_KEY = 'admin_token'
const chartContainer = 'interactionBarChart'

// API 데이터 불러오기
const fetchData = async (staffId) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)

  try {
    const response = await axios.get(`http://localhost:8080/admin/table?staffId=${staffId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Bearer 토큰 전달
      }
    })

    const data = response.data.response.data
    records.value = data.map((item) => ({
      elderId: item.elderId,
      elderName: item.elderName,
      elderAddress: item.elderAddress,
      elderNumber: item.elderNumber,
      status: item.status,
      totalCount: item.totalCount,
      lastCheckIn: item.lastCheckIn,
      firstInterval: item.firstInterval,
      secondInterval: item.secondInterval,
      thirdInterval: item.thirdInterval,
      fourthInterval: item.fourthInterval
    }))
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    alert('데이터를 불러오는 데 실패했습니다.')
  }
}

// 차트 그리기
const drawBarChart = () => {
  const ctx = document.getElementById(chartContainer).getContext('2d')
  if (barChart) barChart.destroy()

  const labels = records.value.map((record) => `Elder ID ${record.elderId}`)
  const data = records.value.map((record) => record.totalCount)
  const backgroundColors = data.map((value) => (value === 0 ? 'red' : 'blue'))

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '총 상호작용 횟수',
          data: data,
          backgroundColor: backgroundColors
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Elder ID' }
        },
        y: {
          title: { display: true, text: '상호작용 횟수' },
          beginAtZero: true
        }
      }
    }
  })
}

// 로그아웃
const logoutHandler = () => {
  logout('admin')
  alert('로그아웃되었습니다.')
  router.push('/login')
}

// 컴포넌트 마운트 시 실행
onMounted(async () => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)

  if (!token) {
    alert('다시 로그인 해주세요.')
    router.push('/login')
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/auth/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status !== 200 || response.data !== 'Token is valid') {
      throw new Error('유효하지 않은 토큰입니다.')
    }

    console.log('토큰 검증 성공: 페이지 로드')
  } catch (error) {
    console.error('토큰 검증 실패:', error.message)
    alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    router.push('/login')
  }
})
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css');

.icon-button {
  font-size: 20px;
}

.chart-container {
  width: 800px;
  height: 400px;
  margin: 0 auto;
}

.data-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}

/* 우상단 아이콘 버튼 스타일 */
.button-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
