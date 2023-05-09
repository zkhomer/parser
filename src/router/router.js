import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LeftMenu from '../views/LeftMenu.vue'
import CategoryInfo from '../views/CategoryInfo.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LeftMenu
    },
    {
        path: '/pages-category',
        name: 'pages',
        component: Home
    },
    {
        path:'/login-page',
        name: 'login-page',
        component: LoginPage,
    },
    {
        path:'/category-info',
        name: 'category-info',
        component: CategoryInfo,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const userData = localStorage.getItem('user-data')

    if (!userData && to.name !== 'login-page') {
        next('/login-page')
    } else if (userData && to.name === 'login-page') {
        next('/')
    } else {
        next()
    }
})

export default router
