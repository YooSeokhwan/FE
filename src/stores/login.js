import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export async function elderLogin(elderAccount, elderPwd) {
  try {
    const response = await axios.post('http://localhost:8080/api/elders/login', {
      elderAccount,
      elderPwd,
    });

    if (response.data.success === 'true' && response.data.response?.data?.accessToken) {
      const token1 = response.data.response.data.accessToken;
      localStorage.setItem('elder_token', token1);
      return token1;
    } else if (response.data.success === 'true' && response.data.response?.data?.refreshToken) {
      const token2 = response.data.response.data.refreshToken;
      return token2;
    } else {
      throw new Error(response.data.response?.message || '로그인 실패: 토큰이 없습니다.');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
}

export async function adminLogin(email, password) {
  try {
    const response = await axios.post('http://localhost:8080/admin/login', {
      staff_email: email,
      password,
    });

    if (response.data.success === 'true' || response.data.success === true) {
      const token = response.data.response.data.token;
      localStorage.setItem('admin_token', token);
      const decoded = jwtDecode(token);
      const staffId = decoded.staff_id;
      localStorage.setItem('staff_id', staffId);
      return token;
    } else {
      throw new Error(response.data.message || 'Invalid admin credentials');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
}

export async function login(type, credentials) {
  if (type === 'elder') {
    return await elderLogin(credentials.elderAccount, credentials.elderPwd);
  } else if (type === 'admin') {
    return await adminLogin(credentials.email, credentials.password);
  } else {
    throw new Error(`알 수 없는 로그인 유형: ${type}`);
  }
}