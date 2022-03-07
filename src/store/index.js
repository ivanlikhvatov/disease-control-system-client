import Vue from 'vue'
import Vuex from 'vuex'
import example from "../api/example";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: null,
    infoMessage: null,
    emails: null,

  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async firstRequest(){
      const result = await example.sendRequest()
      const data = await result.json()

      alert(data.id + "; " + data.message)
    },
  },
  modules: {
  }
})
