import "@/assets/main.css"
import {createApp} from 'vue'
import {ElButton, ElCard, ElCol, ElRow} from "element-plus";
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ElCard)
app.use(ElRow)
app.use(ElCol)
app.use(ElButton)

app.mount('#app')