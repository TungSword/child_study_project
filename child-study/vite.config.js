import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

export default defineConfig({
    plugins: [
        vue(),
        importToCDN({
            modules: [
                {
                    name: 'vue',
                    var: 'Vue',
                    path: `https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.min.js`,

                },
                {
                    name: 'vue-demi',
                    var: 'VueDemi',
                    path: `https://cdn.jsdelivr.net/npm/vue-demi@0.14.7/lib/index.iife.min.js`,
                },
                {
                    name:"axios",
                    var:"axios",
                    path:"https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"
                },
                {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: `https://cdn.jsdelivr.net/npm/vue-router@4.3.0/dist/vue-router.global.min.js`,
                },
                {
                    name: 'element-plus',
                    var: 'ElementPlus',
                    path: 'https://cdn.jsdelivr.net/npm/element-plus@2.6.3/dist/index.full.min.js',
                    css: 'https://cdn.jsdelivr.net/npm/element-plus@2.6.3/dist/index.min.css'
                },
                {
                    name:"@element-plus/icons-vue",
                    var:"ElementPlusIconsVue",
                    path:"https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.3.1/dist/index.iife.min.js"
                }
            ]})
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            "three": "https://cdn.jsdelivr.net/npm/three@0.163.0/+esm"
        }
    }
})
