import DayComponent from '@/components/dayComponent.vue'
import TableComponet from '@/components/TableComponet.vue'
import LogView from '@/views/logView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AuthView from '@/views/AuthView.vue'
import RegistView from '@/views/RegistView.vue'
import RegisterComponent from '@/components/registerComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'log',
      component: LogView
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView
    },
    {
      path: '/regi ',
      name: 'register',
      component: RegistView
    },
    
    {
      path: '/calendrier',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterComponent
    },
    {
      path: '/mois',
      name: 'MonthList',
      component: TableComponet, // Composant pour afficher les mois
    },
    {
      path: '/mois/:monthIndex',
      name: 'MonthView',
      component: DayComponent, // Composant pour afficher les jours d'un mois
    
    },
  ]
})

export default router
