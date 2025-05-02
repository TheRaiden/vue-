import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status
    },
    logout(state) {
      state.isLoggedIn = false
    },
  },
  actions: {
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

//定义logout动作
function initializeStore() {
  const token = localStorage.getItem('token')
  if (token) {
    store.commit('setLoggedIn', true)
  }
}

initializeStore()

export default store
