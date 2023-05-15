import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ListPage from '../pages/ListPage.vue'
import DetailPage from '../pages/DetailPage.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'list',
        component: ListPage,
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: DetailPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router