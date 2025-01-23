<template>
  <div>
    <h1>Mooluck</h1>
    
    <div class="button-container">
      <button class="btn btn-outline-secondary icon-button" @click="openSettings">
        <i class="bi bi-gear"></i>
      </button>
    </div>

    <!-- 날짜 선택 / 전체 보기 버튼 -->
    <div class="filter-container">
      <label>날짜 선택: </label>
      <input type="date" v-model="selectedDate" @change="filterDataByDate" />
      <button @click="showAllData">전체</button>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <canvas id="interactionBarChart"></canvas>
    </div>

    <!-- 노인 신규 등록 버튼 -->
    <button @click="openRegisterModal">노인 신규등록</button>

    <!-- 회원가입 모달 -->
    <div v-if="showRegisterModal" class="modal">
      <div class="modal-content">
        <h2>노인 회원가입</h2>
        <label>이름: <input v-model="newElder.elderName" /></label><br />
        <label>주소: <input v-model="newElder.elderAddress" /></label><br />
        <label>전화번호: <input v-model="newElder.elderNumber" /></label><br />
        <label>아이디: <input v-model="newElder.elderAccount" /></label><br />
        <label>비밀번호: <input v-model="newElder.elderPwd" /></label><br />
        <button @click="registerElder">등록</button>
        <button @click="closeRegisterModal">취소</button>
      </div>
    </div>
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
          <th>노인정보 수정 및 삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in records"
          :key="record.elderId"
          @click="rowClickHandler(index)"
        >
          <td>
            <span>{{ record.elderId }}</span>
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
            <span
              :style="{ color: getStatusColor(record.status) }">
              {{ record.status }}
            </span>
          </td>
          <td>
            <span>{{ record.totalCount }}</span>
          </td>
          <td>
            <span>{{ record.lastCheckIn }}</span>
          </td>
          <td>
            <button v-if="editIndex === index" @click.stop="updateRecord(index)">저장</button>
            <button v-if="editIndex === index" @click.stop="cancelEditing()">취소</button>
            <button v-else @click.stop="startEditing(index)">수정</button>
            <button @click.stop="deleteRecord(index)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="fetchData(staffId)">데이터 불러오기</button>
    <button @click="logout">로그아웃</button>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { logout } from '@/stores/logout';

const allRecords = ref([])
const records = ref([]); // 현재 화면에 표시할 데이터
const selectedDate = ref(null);
const today = new Date().toISOString().split('T')[0];
 
const showRegisterModal = ref(false);
const newElder = ref({
  elderName: '',
  elderAddress: '',
  elderNumber: '',
  elderAccount: '',
  elderPwd: ''
});

const editIndex = ref(null)
let barChart = null
const router = useRouter();
const ADMIN_TOKEN_KEY = 'admin_token';
const chartContainer = 'interactionBarChart';

const staffId = localStorage.getItem('staff_id');
if (!staffId) {
  alert('관리자 정보를 불러올 수 없습니다. 다시 로그인해주세요.');
  router.push('/login');
  throw new Error('staff_id가 없습니다. 다시 로그인하세요.');
}

const fetchData = async (staffId) => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  try {
    const response = await axios.get(`http://localhost:8080/admin/table?staffId=${staffId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.response.data;
    allRecords.value = data.map((item) => ({
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
      fourthInterval: item.fourthInterval,
    }));

    // records에 오늘 날짜 데이터만 필터링
    records.value = allRecords.value.filter(
      (item) => item.lastCheckIn && item.lastCheckIn.startsWith(today)
    );
    drawBarChart();

  } catch (error) {
    console.error('데이터 로드 실패:', error);
    alert('데이터를 불러오는 데 실패했습니다.');
  }
}

// 날짜 선택 필터링
const filterDataByDate = () => {
  if (selectedDate.value) {
    records.value = allRecords.value.filter(
      (item) => item.lastCheckIn && item.lastCheckIn.startsWith(selectedDate.value)
    );
    drawBarChart();
  }
};

// 전체 버튼 
const showAllData = () => {
  records.value = allRecords.value;
  drawBarChart();
};


// 노인 등록하기
const openRegisterModal = () => {
  showRegisterModal.value = true;
};

const closeRegisterModal = () => {
  showRegisterModal.value = false;
};

const registerElder = async () => {
  try {
    const elderData = {
      ...newElder.value,
      staffId: parseInt(staffId, 10)
    };

    console.log(elderData);

    await axios.post('http://localhost:8080/admin/elder/signup', elderData);
    alert('노인 등록 성공');
    closeRegisterModal();
    fetchData(staffId);
  } catch (error) {
    console.error('노인 등록 실패:', error);
    alert('노인 등록에 실패했습니다.');
  }
};

// 노인 정보 수정
const startEditing = (index) => {
  editIndex.value = index;
};

const cancelEditing = () => {
  editIndex.value = null;
  fetchData(staffId);
};

const updateRecord = async (index) => {
  const record = records.value[index];
  try {
    await axios.put(`http://localhost:8080/admin/elder/update/${record.elderId}`, {
      elderName: record.elderName,
      elderAddress: record.elderAddress,
      elderNumber: record.elderNumber,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}`,
      },
    });
    alert('노인 정보가 수정되었습니다.');
    editIndex.value = null;
    await fetchData(staffId);
  } catch (error) {
    console.error('수정 실패:', error);
    alert('노인 정보 수정에 실패했습니다.');
  }
};

// 노인 정보 삭제 
const deleteRecord = async (index) => {
  const record = records.value[index];
  const confirmDelete = confirm('정말로 삭제하시겠습니까?');
  if (!confirmDelete) {
    alert("삭제가 취소되었습니다.");
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/admin/elder/delete/${record.elderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}`,
      },
    });
    alert('노인 정보가 삭제되었습니다.');
    await fetchData(staffId);
  } catch (error) {
    console.error('삭제 실패:', error);
    alert('노인 정보 삭제에 실패했습니다.');
  }
};



// 차트 그리기
const drawBarChart = () => {
  const ctx = document.getElementById(chartContainer).getContext('2d');
  if (barChart) barChart.destroy();

  const labels = records.value.map((record) => `Elder ID ${record.elderId}`);
  const data = records.value.map((record) => record.totalCount);
  const backgroundColors = data.map((value) => (value === 0 ? 'red' : 'blue'));

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '총 상호작용 횟수',
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Elder ID' },
        },
        y: {
          title: { display: true, text: '상호작용 횟수' },
          beginAtZero: true,
        },
      },
    },
  });
};

// 각 row에 대한 시간 차트
const rowClickHandler = (index) => {
  if (index >= 0 && index < records.value.length) {
    const record = records.value[index]
    
    const ctx = document.getElementById(chartContainer).getContext('2d')

    if (barChart) barChart.destroy()

    barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0시', '6시', '12시', '18시', '24시'],
        datasets: [
          {
            label: `Elder ID ${record.elderId} Interaction Intervals`,
            data: [
              record.firstInterval,
              record.secondInterval,
              record.thirdInterval,
              record.fourthInterval,
              0
            ],
            borderColor: 'blue',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: '시간' }
          },
          y: {
            title: { display: true, text: '상호작용 횟수' },
            beginAtZero: true
          }
        }
      }
    })
  } else {
    console.error(`Invalid row index: ${index}`)
  }
}

// 상태(status) 색 바꾸기
const getStatusColor = (status) => {
  switch (status) {
    case '양호':
      return 'green';
    case '경고':
      return 'orange';
    case '위험':
      return 'red';
    default:
      return 'black';
  }
};


onMounted(async () => {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    alert('다시 로그인 해주세요.');
    router.push('/login');
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
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      router.push('/login');
    }
  })

onMounted(() => fetchData(staffId))
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

.button-container {
  position: absolute;
  top: 20px;
  right: 20px;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>