<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { provide } from 'vue';
function handleLoginSuccess() {
  console.log('로그인 성공!');
}
provide('handleLoginSuccess', handleLoginSuccess);
</script>



<template>
  <div>
    <Header/>
    <main class="content">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
</style>
