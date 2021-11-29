import { Module } from 'vuex'
import { accountLoginRequest } from '@/service/login/login'
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
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
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
      console.log(loginResult)
    }
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}
export default loginModule
