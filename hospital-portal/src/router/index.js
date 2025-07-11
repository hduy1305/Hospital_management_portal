import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ScheduleView from '../views/ScheduleView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/schedule', component: ScheduleView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
