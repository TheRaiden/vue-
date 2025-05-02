import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Have from '../views/Have.vue'
import Add from '../views/Add.vue'
import My from '../views/My.vue'
import About from '../views/About.vue'
import Gear from '../views/have/Gear.vue'
import AirConditioner from '../views/have/AirConditioner.vue'
import Compressor from '../views/have/Compressor.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/have',
    name: 'Have',
    component: Have,
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
  },
  {
    path: '/my',
    name: 'My',
    component: My,
  },
  {
    path: '/have/gear',
    name: 'Gear',
    component: Gear,
  },
  {
    path: '/have/air-conditioner',
    name: 'AirConditioner',
    component: AirConditioner,
  },
  {
    path: '/have/compressor',
    name: 'Compressor',
    component: Compressor,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
