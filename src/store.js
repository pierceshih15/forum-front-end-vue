import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 資料內容，如各元件中的 data
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false,
    },
    isAuthenticated: false,
    token: ''
  },
  // 用來修改 state 資料的函式
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }

      // 將使用者驗證用的 token 存入 state 中使用
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時，清空 state 中的 token
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 用來設定其他的非同步函式
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({
      commit
    }) {
      try {
        const {
          data,
          statusText
        } = await usersAPI.getCurrentUser();

        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          isAdmin: data.isAdmin,
        })

        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    }
  }
})