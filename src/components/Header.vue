<template>
  <header :style="{ backgroundColor: headerColor }" class="Header">
    <h1 class="title">{{ pageTitle }}</h1>
    <nav v-if="!isAdminPage">
      <a
        v-for="link in navigationLinksList"
        :key="link.route"
        :href="link.route"
      >
        {{ link.name }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { useAppSettings } from '@/useAppSettings';

const { pageTitle, isAdminPage, headerColor, navigationLinksList } = useAppSettings('ko');
</script>

<style scoped>
.Header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 70px;
  background-color: #ffe0b2;
  color: #5d4037;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 10px 0;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

nav a {
  color: #5d4037;
  margin: 0 1rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
}

nav a:hover {
  color: #bf360c;
}
</style>

  