import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../pages/Login.vue";
import store from '../store/index.js'
import Registration from "../pages/Registration.vue";
import ActivateAccount from "../pages/ActivateAccount.vue";
import Profile from "../pages/Profile";

Vue.use(VueRouter)

const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/registration/activate',
    name: 'activate',
    props: route => (
        { activationCode: route.query.activationCode, userName: route.query.userName }
    ),
    component: ActivateAccount
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
