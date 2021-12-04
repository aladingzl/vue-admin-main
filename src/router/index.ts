import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
//加 type 区别于上面，是一种类型
// import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫 （回调函数）
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // 解决页面刷新后，跳转到 not-found
  // console.log(router.getRoutes())
  // route 对象
  // console.log(to)
  // {fullPath: '/main/system/user', path: '/main/system/user', query: {…}, hash: '', name: 'notFound', …}
  // 匹配到 name是 notFound
  // 为什么
  // 解决 调换 app.use(router) 和 setupStore() 执行顺序

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
