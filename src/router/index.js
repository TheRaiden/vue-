import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Have from '../views/Have.vue'
import Add from '../views/Add.vue'
import Search from '../views/Search.vue'
import My from '../views/My.vue'
import About from '../views/About.vue'

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
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/my',
    name: 'My',
    component: My,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
