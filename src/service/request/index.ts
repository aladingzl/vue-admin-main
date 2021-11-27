import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestConfig, MYRequestInterceptors } from './type'
// 类的封装性更强

class MYRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    //1. 实例
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 2.全局 添加所有的实例都有的拦截器
    // 请求 后添加的先请求
    // 响应 先添加的  先响应
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求拦截成功')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应拦截成功')
        return res
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }

  // request(config: AxiosRequestConfig): void {
  //   this.instance.request(config).then((res) => {
  //     console.log(res)
  //   })
  // }
  // request(config: MYRequestConfig): void {
  //   this.instance.request({ ...config, transformRequest}).then((res) => {
  //     console.log(res)
  //   })
  // }
  // 3.每个单独的请求也可以有属于自己的拦截
  request(config: MYRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default MYRequest
