import { reactive } from 'vue';

export const store = reactive({
  isAuthenticated: false,
  token: null,
  setAuthentication(token) {
    this.isAuthenticated = !!token;
    this.token = token;
  },
  clearAuthentication() {
    this.isAuthenticated = false;
    this.token = null;
  },
});
