import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import StudentDashboard from './pages/StudentDashboard.vue'
import AdminDashboard from './pages/AdminDashboard.vue'

const routes = [
  { path: '/', redirect: '/student' },
  { path: '/student', component: StudentDashboard },
  { path: '/admin', component: AdminDashboard }
]

const router = createRouter({ history: createWebHistory(), routes })

createApp(App).use(router).mount('#app')
