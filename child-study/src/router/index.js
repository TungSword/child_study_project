import {createRouter, createWebHistory} from 'vue-router'
import home from "@/views/home.vue";
import opera_home from "@/views/opera_home.vue";

const routes = [
    {
        path: "/",
        name: "首页",
        component: home
    },
    {
        path: "/opera",
        name: "戏曲",
        component: opera_home
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router
