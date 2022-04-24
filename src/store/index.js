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
    serverResponse: {},

    allInstitutes: [],
    directionsBySelectedInstitute: [],
    profilesBySelectedDirection: [],
    groupsBySelectedProfiles: []
  },

  getters: {
    authStatus: state => state.status,
    serverError: state => state.serverError,
    serverResponse: state => state.serverResponse,
    user: state => state.user,

    isLoggedIn: state => !!state.token,
    isStudent: state => state.user.roles && state.user.roles.indexOf("STUDENT") !== -1,
    isAdmin: state => state.user.roles && state.user.roles.indexOf("ADMIN") !== -1,
    isCurator: state => state.user.roles && state.user.roles.indexOf("CURATOR") !== -1,
    isCuratorSupervising: state => state.user.roles && state.user.roles.indexOf("CURATOR_SUPERVISING") !== -1,
    isRectorat: state => state.user.roles && state.user.roles.indexOf("RECTORAT") !== -1,
    isDecanat: state => state.user.roles && state.user.roles.indexOf("DECANAT") !== -1,
    isTeacher: state => state.user.roles && state.user.roles.indexOf("TEACHER") !== -1,

    allInstitutes: state => state.allInstitutes,
    directionsBySelectedInstitute: state => state.directionsBySelectedInstitute,
    profilesBySelectedDirection: state => state.profilesBySelectedDirection,
    groupsBySelectedProfiles: state => state.groupsBySelectedProfiles,
  },

  mutations: {
    activation_request(state, response){
      state.serverResponse = response
    },
    auth_success(state, user){
      state.status = 'success'
      state.token = user.token
      state.user = user
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
    },

    get_institutes_request(state, institutes) {
      state.allInstitutes = institutes;
    },

    get_directions_request(state, directions) {
      state.directionsBySelectedInstitute = directions;
    },

    get_profiles_request(state, profiles) {
      state.profilesBySelectedDirection = profiles
    },

    get_groups_request(state, groups) {
      state.groupsBySelectedProfiles = groups
    },
  },

  actions: {
    getUserInfo({commit}) {
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/user/info', method: 'GET'})
            .then(resp => {
              const user = resp.data
              commit('user_info_request', user)
              resolve(resp)
            })
      })
    },

    resendActivationCode({commit}, activationCode) {
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/auth/code/resend', params: {expiredActivationCode: activationCode}, method: 'POST'})
            .then(resp => {
              const serverResponse = resp.data.status
              commit('activation_request', serverResponse)
              resolve(resp)
            })
      })
    },

    activateAccount({commit}, activationCode) {
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/auth/activate', params: {activationCode: activationCode}, method: 'POST'})
            .then(resp => {
              const serverResponse = resp.data;
              commit('activation_request', serverResponse)
              resolve(resp)
            })
      })
    },

    login({commit}, user){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/auth/login', data: user, method: 'POST' })
            .then(resp => {
              const token = 'Bearer_' + resp.data.token
              const user = resp.data
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', user)
              resolve(resp)
            })
      })
    },

    register({commit}, user){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/auth/registration', data: user, method: 'POST' })
            .then(resp => {
              const user = resp.data
              commit('auth_success', user)
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    createUser({commit}, user){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/admin/users/create', data: user, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    getInstitutes({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/admin/institutes', method: 'GET' })
            .then(resp => {
              const institutes = resp.data;
              commit('get_institutes_request', institutes)
              resolve(resp)
            })
      })
    },

    getDirections({commit}, instituteId){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/admin/institutes/'+ instituteId + '/directions', method: 'GET' })
            .then(resp => {
              const directions = resp.data;
              commit('get_directions_request', directions)
              resolve(resp)
            })
      })
    },

    getProfiles({commit}, directionId){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/admin/directions/'+ directionId + '/profiles', method: 'GET' })
            .then(resp => {
              const profiles = resp.data;
              commit('get_profiles_request', profiles)
              resolve(resp)
            })
      })
    },

    getGroups({commit}, profileId){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/admin/profiles/'+ profileId + '/groups', method: 'GET' })
            .then(resp => {
              const groups = resp.data;
              commit('get_groups_request', groups)
              resolve(resp)
            })
      })
    },

    logout({commit}){
      //TODO послать запрос logout на сервер?
      return new Promise((resolve) => {
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
    },

    setServerError({commit}, serverError){
      commit('request_failed', serverError)
    }
  },

  modules: {
  }
})
