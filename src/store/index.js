import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    serverError: {}
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    serverError: state => state.serverError
  },

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    request_failed(state, serverError){
      state.serverError = serverError
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.serverError = {}
      state.user = {}
    },
    clearServerError(state){
      state.serverError = {}
    }
  },

  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:9000/api/v1/auth/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              const serverError = err.response.data;
              commit('request_failed', serverError)
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },

    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:9000/api/v1/auth/registration', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error', err)
              const serverError = err.response.data;
              commit('request_failed', serverError)
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },

    logout({commit}){
        // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    clearServerError({commit}){
      commit('clearServerError')
    }
  },

  modules: {
  }
})
