import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import router from '@/router'

import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import { IRootState } from '../types'
import { ILoginState } from './types'
import { IAccount } from '@/service/login/type'
// Module<S, R>  为什么传两个
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routes
      // console.log(userMenus)
      const routes = mapMenusToRoutes(userMenus)

      console.log(routes)

      // 将 routes => router.main.children
      routes.forEach((route) => {
        // addRoute
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log('执行accountLoginAction', payload)
      // 1. 实现登录逻辑
      // accountLoginRequest().then(res => {}) 这样写容易产生回调地狱 改用 async...await 考虑其用法 Promise等等
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 缓存 token
      localCache.setCache('token', token)

      console.log(loginResult)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 缓存 userInfo
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('UserMenus', userMenus)
      console.log(userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 获取本地信息
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const UserMenus = localCache.getCache('UserMenus')
      if (UserMenus) {
        commit('changeUserMenus', UserMenus)
      }
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}
export default loginModule
