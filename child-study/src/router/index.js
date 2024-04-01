import {createRouter, createWebHistory} from 'vue-router'
import home from "@/views/home.vue";

const routes = [
    {
        path: "/",
        name: "首页",
        component: home
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
