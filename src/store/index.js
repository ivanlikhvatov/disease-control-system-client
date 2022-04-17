import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    serverError: {},
    serverResponse: {}
  },

  getters: {
    authStatus: state => state.status,
    serverError: state => state.serverError,
    serverResponse: state => state.serverResponse,
    user: state => state.user,

    isLoggedIn: state => !!state.token,
    isStudent: state => state.user.roles.indexOf("STUDENT") !== -1,
    isAdmin: state => state.user.roles.indexOf("ADMIN") !== -1,
    isCurator: state => state.user.roles.indexOf("CURATOR") !== -1,
    isCuratorSupervising: state => state.user.roles.indexOf("CURATOR_SUPERVISING") !== -1,
    isRectorat: state => state.user.roles.indexOf("RECTORAT") !== -1,
    isDecanat: state => state.user.roles.indexOf("DECANAT") !== -1,
    isTeacher: state => state.user.roles.indexOf("TEACHER") !== -1,
  },

  mutations: {
    activation_request(state, response){
      state.serverResponse = response
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user){
      state.status = 'success'
      state.token = user.token
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
    },

    clearServerResponse(state){
      state.serverResponse = {}
    },

    user_info_request(state, user) {
      state.user = user
    }
  },

  actions: {

    getUserInfo({commit}) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer_sdlkjdslkfj'

      // alert(axios.defaults.headers.common['Authorization'])
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:9000/api/v1/user/info', method: 'GET'})
            .then(resp => {
              const user = resp.data
              commit('user_info_request', user)
              resolve(resp)
            })
            .catch(err => {
              const serverError = err.response.data;
              commit('request_failed', serverError)
              reject(err)
            })
      })

    },

    resendActivationCode({commit}, activationCode) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:9000/api/v1/auth/code/resend', params: {expiredActivationCode: activationCode}, method: 'POST'})
            .then(resp => {
              const serverResponse = resp.data.status
              commit('activation_request', serverResponse)
              resolve(resp)
            })
            .catch(err => {
              const serverError = err.response.data;
              commit('request_failed', serverError)
              reject(err)
            })
      })
    },

    activateAccount({commit}, activationCode) {
      return new Promise((resolve, reject) => {
        axios({url: 'http://localhost:9000/api/v1/auth/activate', params: {activationCode: activationCode}, method: 'POST'})
            .then(resp => {
              const serverResponse = resp.data;
              commit('activation_request', serverResponse)
              resolve(resp)
            })
            .catch(err => {
              const serverError = err.response.data;
              commit('request_failed', serverError)
              reject(err)
            })
      })
    },

    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:9000/api/v1/auth/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', user)
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
              const user = resp.data
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', user)
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
      //TODO послать запрос logout на сервер?
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
    },

    clearServerResponse({commit}){
      commit('clearServerResponse')
    }
  },

  modules: {
  }
})
