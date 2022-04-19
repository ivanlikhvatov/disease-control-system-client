import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

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



// axios.interceptors.request.use(
//     config => {
//       alert('перехватил');
//       const token = localStorage.getItem('token');
//       config.data = JSON.stringify(config.data);
//       config.headers = {
//         'Content-Type':'application/json; charset=utf-8',
//         'Authorization':token
//       };
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     }
// );
// // перехватчик ответа http
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 Очистить информацию о токене и перейти на страницу входа
            this.$store.dispatch("logout");
        }
      }
      return Promise.reject(error.response);
    });

