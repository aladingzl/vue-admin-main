import axios, { AxiosResponse } from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
// 类的封装性更强
interface MYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: AxiosResponse) => AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorCatch?: (error: any) => any
}

interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors
}
class MYRequest {
  instance: AxiosInstance
  interceptors?: MYRequestInterceptors

  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default MYRequest
