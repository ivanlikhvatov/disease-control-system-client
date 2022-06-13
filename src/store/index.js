import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    activeUserDiseaseInfo: {},
    processedDiseasesList: [],
    activeDiseasesList: [],
    allDiseasesList: [],
    serverError: {},
    serverResponse: {},

    allInstitutes: [],
    directionsBySelectedInstitute: [],
    profilesBySelectedDirection: [],
    groupsBySelectedProfiles: [],

    diseasesExistingInDirectory: [],
  },

  getters: {
    authStatus: state => state.status,
    serverError: state => state.serverError,
    serverResponse: state => state.serverResponse,
    user: state => state.user,
    activeUserDiseaseInfo: state => state.activeUserDiseaseInfo,
    processedDiseasesList: state => state.processedDiseasesList,
    activeDiseasesList: state => state.activeDiseasesList,
    allDiseasesList: state => state.allDiseasesList,

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

    diseasesExistingInDirectory: state => state.diseasesExistingInDirectory,
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
      state.activeUserDiseaseInfo = {}
      state.processedDiseasesList = []
      state.activeDiseasesList = []
      state.allDiseasesList = []
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

    get_active_user_disease_request(state, activeUserDiseaseInfo) {
      state.activeUserDiseaseInfo = activeUserDiseaseInfo

      state.serverResponse = {
        status: 'ok'
      }
    },

    get_processed_diseases_list_request(state, processedDiseasesList) {
      state.processedDiseasesList = processedDiseasesList

      state.serverResponse = {
        status: 'ok'
      }
    },

    get_active_diseases_list_by_decanat_request(state, activeDiseasesList) {
      state.activeDiseasesList = activeDiseasesList

      state.serverResponse = {
        status: 'ok'
      }
    },

    get_all_diseases_list_by_decanat_request(state, allDiseasesList) {
      state.allDiseasesList = allDiseasesList

      state.serverResponse = {
        status: 'ok'
      }
    },

    get_groups_request(state, groups) {
      state.groupsBySelectedProfiles = groups
    },

    get_diseases_existing_in_directory_request(state, diseases) {
      state.diseasesExistingInDirectory = diseases
    }
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

    // eslint-disable-next-line no-unused-vars
    addDiseaseInformation({commit}, data){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/student/diseases/info/add', data: data, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    approveDiseaseBySick({commit}, data){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/student/diseases/info/approve/bySick', data: data, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    approveDiseaseByDecanat({commit}, diseaseId){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/' + diseaseId +'/approve', method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    refundDiseaseToUser({commit}, data){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/' + data.diseaseId +'/refund', params: {refundCause: data.refundCause}, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    rejectDisease({commit}, data){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/' + data.diseaseId +'/reject', params: {rejectCause: data.rejectCause}, method: 'POST' })
            .then(resp => {
              resolve(resp)
            })
      })
    },

    // eslint-disable-next-line no-unused-vars
    editDiseaseInformation({commit}, data){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/student/diseases/info/edit', data: data, method: 'POST' })
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

    getActiveUserDisease({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/student/diseases/info', method: 'GET' })
            .then(resp => {
              const activeUserDiseaseInfo = resp.data;
              commit('get_active_user_disease_request', activeUserDiseaseInfo)
              resolve(resp)
            })
      })
    },

    getProcessedDiseasesList({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/processed', method: 'GET' })
            .then(resp => {
              const processedDiseasesList = resp.data;
              commit('get_processed_diseases_list_request', processedDiseasesList)
              resolve(resp)
            })
      })
    },

    getActiveDiseasesListByDecanat({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/active', method: 'GET' })
            .then(resp => {
              const activeDiseasesList = resp.data;
              commit('get_active_diseases_list_by_decanat_request', activeDiseasesList)
              resolve(resp)
            })
      })
    },

    getAllDiseasesByDecanatList({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/decanat/diseases/all', method: 'GET' })
            .then(resp => {
              const activeDiseasesList = resp.data;
              commit('get_all_diseases_list_by_decanat_request', activeDiseasesList)
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

    getDiseasesExistingInDirectory({commit}){
      return new Promise((resolve) => {
        axios({url: 'http://localhost:9000/api/v1/student/diseases', method: 'GET' }) //TODO поправить path: student тут лишнее
            .then(resp => {
              const institutes = resp.data;
              commit('get_diseases_existing_in_directory_request', institutes)
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
