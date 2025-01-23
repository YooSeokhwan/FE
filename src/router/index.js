import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'adminlogin',
    component: () => import('@/views/admin/AdminloginPage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'adminsignup',
    component: () => import('@/views/admin/AdminSignupPage.vue')
  },

  {
    path: '/mooluck',
    name: 'mooluck',
    component: () => import('@/views/user/MooluckPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/interaction',
    name: 'interaction',
    component: () => import('@/views/user/MooluckInteractionPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});



export default router;
