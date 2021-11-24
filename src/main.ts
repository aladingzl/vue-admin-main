import { createApp } from 'vue'
//全局引入
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/base.css'

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElRadio
} from 'element-plus/lib/components'
const components = [ElButton, ElForm, ElFormItem, ElRadio]

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

for (const component of components) {
  app.component(component.name, component)
}

app.use(router)
app.use(store)

app.mount('#app')
