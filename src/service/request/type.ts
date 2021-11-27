import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig

  requestInterceptorCatch?: (error: any) => any

  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse

  responseInterceptor?: (res: any) => any

  responseInterceptorCatch?: (error: any) => any
}

export interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors
  showLoading?: boolean
}
