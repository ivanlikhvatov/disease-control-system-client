import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../pages/Login.vue";
import store from '../store/index.js'
import Registration from "../pages/Registration.vue";
import ActivateAccount from "../pages/ActivateAccount.vue";
import Profile from "../pages/Profile";
import UserCreation from "../pages/UserCreation";
import DiseaseAdd from "@/pages/DiseaseInfoAdd";
import DiseaseInfo from "@/pages/DiseaseInfo";
import DiseaseInfoEdit from "@/pages/DiseaseInfoEdit";
import DiseaseApproveBySick from "@/pages/DiseaseApproveBySick";
import DiseaseApproveByDecanat from "@/pages/DiseaseApproveByDecanat";
import ChooseGraphics from "@/pages/ChooseGraphics";
import ChooseDiseasesTable from "@/pages/ChooseDiseasesTable";

Vue.use(VueRouter)

const routes = [

  {
    path: '/diseases/table/choose',
    name: 'chooseTableDiseases',
    component: ChooseDiseasesTable,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkWatchStatisticPermission,
  },
  {
    path: '/diseases/graphics/choose',
    name: 'chooseGraphics',
    component: ChooseGraphics,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkWatchStatisticPermission,
  },
  {
    path: '/disease/approve/byDecanat',
    name: 'approveDiseaseByDecanat',
    component: DiseaseApproveByDecanat,
    props: route => (
        { diseaseInfo: route.query.diseaseInfo }
    ),
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkDecanatPermission,
  },
  {
    path: '/disease/approve/bySick',
    name: 'approveDiseaseBySick',
    props: route => (
        { approveType: route.query.approveType, diseaseId: route.query.diseaseId, dateOfDisease: route.query.dateOfDisease }
    ),
    component: DiseaseApproveBySick,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkStudentPermission,
  },
  {
    path: '/disease/info/edit',
    name: 'editDiseaseInfo',
    component: DiseaseInfoEdit,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkStudentPermission,
  },
  {
    path: '/disease/info',
    name: 'diseaseInfo',
    component: DiseaseInfo,
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkStudentPermission,
  },
  {
    path: '/disease/info/add',
    name: 'addDiseaseInfo',
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

function checkDecanatPermission(to, from, next) {
  if (store.getters.isDecanat) {
    next();
  } else {
    next('/')
  }
}

function checkWatchStatisticPermission(to, from, next) {
  if (store.getters.isDecanat
      || store.getters.isAdmin
      || store.getters.isTeacher
      || store.getters.isCurator
      || store.getters.isCuratorSupervising
      || store.getters.isRectorat) {
    next();
  } else {
    next('/')
  }
}

export default router
