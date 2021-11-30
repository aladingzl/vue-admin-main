import { RouteRecordRaw } from 'vue-router'
// 映射
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 先去加载默认所有的 routes
  const allRoutes: RouteRecordRaw[] = []
  //webpack 的东西
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    console.log(key)
    // commonjs
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  // 根据菜单获取需要添加的 routes
  return routes
}
