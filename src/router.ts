import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import HowTo from './views/HowTo.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/how-to', component: HowTo }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

export default router
