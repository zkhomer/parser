import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LeftMenu from '../views/LeftMenu.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/LeftMenu',
        name: 'About',
        component: LeftMenu
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
