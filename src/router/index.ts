import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ListPage from '../pages/ListPage.vue'
import DetailPage from '../pages/DetailPage.vue'
import SearchPage from '../pages/SearchPage.vue'
import CategoryPage from '../pages/CategoryPage.vue'

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
    {
        path: '/search/:title',
        name: 'search',
        component: SearchPage,
    },
    {
        path: '/category/:id',
        name: 'category',
        component: CategoryPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
