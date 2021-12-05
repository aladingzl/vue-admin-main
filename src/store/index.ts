import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'hhhh',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

// 在 vuex 中保存的数据，用户刷新后，数据会从内存中消失
// 原来的逻辑是在用户发送请求后，拿到对应请求的数据通过 mutation 设置到 vuex 中
// 利用本地 localStorage判断登录成功，在用户未点击发送请求的情况下
// 防止用户刷新

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
// 自己封装一个
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
