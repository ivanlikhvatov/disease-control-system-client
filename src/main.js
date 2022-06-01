import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')