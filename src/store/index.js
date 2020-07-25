import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = "user_token"

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setToken(state, data) {
      // 将token存到user中
      state.user = data
      // 为了防止刷新页面，token丢失，所以还是将token存放到本地，从而实现持久化
      // 本地存储只能存字符串
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
