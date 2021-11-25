import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
// 类的封装性更强
class MYRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default MYRequest
