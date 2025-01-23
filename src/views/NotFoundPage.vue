<template>
    <div class="not-found">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <router-link to="/">홈으로 돌아가기</router-link>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'NotFoundPage'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 100px;
  }
  </style>