import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestConfig, MYRequestInterceptors } from './type'

import { ElLoading, ILoadingInstance } from 'element-plus/lib/components'
// 类的封装性更强
const DEFAULT_LOADING = true
class MYRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors
    //1. 实例
    // 从 config 中取出的拦截器是对应实例的拦截器
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载',
            background: 'rgba(0, 0, 0, .5)'
          })
        }
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
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else data
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应拦截失败')
        // 将loading 移除
        this.loading?.close()
        // setTimeout(() => {
        //   this.loading?.close()
        // }, 1000)

        if (err.response.status === 404) {
          console.log('404错误信息~')
        }
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
    // console.log(config)

    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    // console.log(config)

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        console.log(res)
        // 将showloading设置为true，不影响下一个请求
        this.showLoading = DEFAULT_LOADING
      })
      .catch((err) => {
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default MYRequest
