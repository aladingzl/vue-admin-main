import { createApp } from 'vue'
import { registerApp } from './global'

import myRequest from './service'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)

app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

// myRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求config')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         // console.log(res)
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

myRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
