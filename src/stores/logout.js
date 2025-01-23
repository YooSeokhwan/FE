export function logout(type) {
  if (type === 'elder') {
    localStorage.removeItem('elder_token');
  } else if (type === 'admin') {
    localStorage.removeItem('admin_token');
  } else {
    console.error(`알 수 없는 사용자 유형: ${type}`);
  }
  alert('로그아웃되었습니다.');
}
