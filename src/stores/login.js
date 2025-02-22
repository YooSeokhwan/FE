import axios from 'axios';


export async function elderLogin(elderAccount, elderPwd) {
  try {
    const response = await axios.post('http://localhost:8080/api/elders/login', {
      elderAccount,
      elderPwd,
    });

    console.log('서버 응답:', response.data);

    if (response.data.success === 'true' && response.data.response?.data?.accessToken) {
      const token = response.data.response.data.accessToken;
      localStorage.setItem('elder_token', token); // Elder 토큰 저장
      return token; // 토큰 반환
    } else {
      throw new Error(response.data.response?.message || '로그인 실패: 토큰이 없습니다.');
    }
  } catch (error) {
    console.error('Elder 로그인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
}


export async function adminLogin(email, password) {
  try {
    const response = await axios.post('http://localhost:8080/admin/login', {
      staff_email: email,
      password,
    });

    console.log('서버 응답:', response.data);

    if (response.data.success === 'true' || response.data.success === true) {
      const token = response.data.response.data.token;
      localStorage.setItem('admin_token', token); // Admin 토큰 저장
      return token; // 토큰 반환
    } else {
      throw new Error(response.data.message || 'Invalid admin credentials');
    }
  } catch (error) {
    console.error('관리자 로그인 실패:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
}


export async function login(type, credentials) {
  if (type === 'elder') {
    return await elderLogin(credentials.elderAccount, credentials.elderPwd);
  } else if (type === 'admin') {
    return await adminLogin(credentials.email, credentials.password);
  } else {
    console.error(`알 수 없는 로그인 유형: ${type}`);
    throw new Error(`알 수 없는 로그인 유형: ${type}`);
  }
}
