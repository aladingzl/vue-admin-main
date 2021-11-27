import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: AxiosResponse) => AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorCatch?: (error: any) => any
}

export interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors
}
