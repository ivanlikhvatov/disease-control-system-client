import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../pages/Login.vue";
import store from '../store/index.js'
import Registration from "../pages/Registration.vue";
import ActivateAccount from "../pages/ActivateAccount.vue";
import Profile from "../pages/Profile";
import UserCreation from "../pages/UserCreation";
import DiseaseAdd from "@/pages/DiseaseAdd";

Vue.use(VueRouter)

const routes = [
  {
    path: '/disease/add',
    name: 'addDisease',
    component: DiseaseAdd,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkStudentPermission,
  },
  {
    path: '/create/user',
    name: 'userCreation',
    component: UserCreation,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkAdminPermission,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (!to.matched.some(record => record.meta)){
    next('/')
    return;
  }

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


function checkAdminPermission(to, from, next) {
  if (store.getters.isAdmin) {
    next();
  } else {
    next('/');
  }
}

function checkStudentPermission(to, from, next) {
  if (store.getters.isStudent) {
    next();
  } else {
    next('/')
  }
}

export default router
