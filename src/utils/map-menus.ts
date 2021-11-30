import { RouteRecordRaw } from 'vue-router'
// 映射
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的 routes
  const allRoutes: RouteRecordRaw[] = []
  //webpack 的东西
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    // commonjs
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的 routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  // 思考数组扁平化  数据深层递归获取等等

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // console.log(menu.children)
      // 数据设计规则
      if (menu.type === 2) {
        // find
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  // console.log(routes)
  return routes
}
