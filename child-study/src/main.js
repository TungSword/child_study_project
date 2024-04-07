import "@/assets/main.css"
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import components from "@/components/index.js";
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

for (const component in components) {
    app.component(component, components[component])
}

app.mount('#app')
