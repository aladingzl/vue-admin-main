// 方式一 ：手动切换不同环境
// const BASE_URL = ''
// const BASE_NAME = ''
// 方式二
// 根据 process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }