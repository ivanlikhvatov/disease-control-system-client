import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer_' + token
}

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
