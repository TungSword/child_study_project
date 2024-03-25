import "@/assets/main.css"
import {createApp} from 'vue'
import {ElButton, ElCard, ElCol, ElInputNumber, ElMessage, ElRow, ElSelect, ElTabs, ElResult, ElCollapse, ElSwitch} from "element-plus";
import 'element-plus/dist/index.css'
import components from "@/components/index.js";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElCard)
app.use(ElRow)
app.use(ElCol)
app.use(ElButton)
app.use(ElInputNumber)
app.use(ElMessage)
app.use(ElTabs)
app.use(ElSelect)
app.use(ElResult)
app.use(ElCollapse)
app.use(ElSwitch)

for (const component in components) {
    app.component(component, components[component])
}

app.mount('#app')