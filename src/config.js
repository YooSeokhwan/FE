export const pageTitles = {
    home: "안녕하세요! 저는 반려식물 '무럭이' 에요🌱 ",
    interaction: '무럭이를 이렇게 사용해보세요🌼',
    default: '저를 무럭 무럭 예쁘게 키워주세요❤️',
    admin: '안녕하세요! 돌봄복지관 관리자 페이지입니다.'
  };
  
  export const adminRoutes = ['admin', 'adminlogin', 'adminsignup'];
  
  export const themeColors = {
    admin: {
      header: '#A5D6A7',
      footer: '#A5D6A7'
    },
    default: {
      header: '#ffe0b2',
      footer: '#ffe0b2'
    }
  };
  
  export const navigationLinks = {
    default: [
      { name: '홈', route: '/' },
      { name: '사용설명서', route: '/interaction' }
    ],
    admin: []
  };
  
  export const images = {
    background: '@/assets/images/orange.gif'
  };
  
  export const footerTexts = {
    admin: [
      '개인정보취급방침',
      '이메일추출방지정책',
      '© 2024 무럭이 서비스',
      '복지관 관리자 페이지',
      '독거노인 돌봄 부서'
    ],
    default: [
      '배움터',
      '사랑의전화',
      '© 2024 무럭이 서비스',
      '무럭이와 함께 행복한 세상을 만들어요'
    ]
  };
  