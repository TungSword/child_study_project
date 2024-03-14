import {createRouter, createWebHistory} from 'vue-router'
import home from "@/views/home.vue";
import homeTabs from "@/views/homeTabs.vue";

const routes = [
    {
        path: "/",
        name: "首页",
        component: home
    },
    {
        path: "/tabs",
        name: "tab首页",
        component: homeTabs
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
