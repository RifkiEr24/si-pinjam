import { createWebHistory , createRouter } from 'vue-router'

import Home from './pages/Home.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/loan/:id', component: () => import('./pages/Loan.vue'), name: 'Loan Detail' },
]

const router = createRouter({
    history: createWebHistory(),
  routes,
})

export default router