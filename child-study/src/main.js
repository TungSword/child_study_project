import "@/assets/main.css"
import {createApp} from 'vue'
import {ElButton, ElCard, ElCol, ElInputNumber, ElMessage, ElRow} from "element-plus";
import 'element-plus/dist/index.css'

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

app.mount('#app')