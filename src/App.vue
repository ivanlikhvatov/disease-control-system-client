<template>
  <div id="app">
    <v-app>
      <v-app-bar app
                 color="primary"
                 dark
      >
        <v-app-bar-nav-icon v-if="isLoggedIn" @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Система контроля заболеваемости</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="isLoggedIn" icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="primary--text text--accent-4"
          >

            <v-list-item
                @click="showProfilePage"
            >
              <v-list-item-avatar>
                <v-avatar color="blue darken-2">
                  <span class="white--text text-h5">{{username.toString()[0]}}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>{{username}}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                @click="showMainPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="blue darken-2"
                >
                  mdi-home
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Главная страница</v-list-item-title>
            </v-list-item>

            <v-list-item
              @click="showProfilePage"
            >
              <v-list-item-icon>
                <v-icon
                    color="blue darken-2"
                >
                  mdi-account
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isStudent"
                @click="showAddDiseaseInfoPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="warning"
                >
                  personal_injury
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Я заболел</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isStudent"
                @click="showDiseaseInfoPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="green darken-2"
                >
                  medical_information
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Мое заболевание</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isAdmin"
                @click="showUserCreationPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="blue darken-2"
                >
                  person_add
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Добавить пользователя</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isTeacher || isCurator || isCuratorSupervising || isRectorat || isDecanat"
                @click="showDiseasesListsPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="success"
                >
                  receipt_long
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Статистика</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isTeacher || isCurator || isCuratorSupervising || isRectorat || isDecanat"
                @click="showChooseGraphicPage"
            >
              <v-list-item-icon>
                <v-icon
                    color="success"
                >
                  query_stats
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Графики</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view/>
      </v-main>

      <v-footer padless>
        <v-col
            class="text-center"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Система контроля заболеваемости</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<style lang="scss">

</style>

<script>
  // import axios from "axios";

  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),

    computed : {
      isLoggedIn : function () { return this.$store.getters.isLoggedIn},
      isAdmin: function () { return this.$store.getters.isAdmin},
      isDecanat: function () { return this.$store.getters.isDecanat},
      isStudent: function () { return this.$store.getters.isStudent},
      isCurator: function () { return this.$store.getters.isCurator},
      isRectorat: function () { return this.$store.getters.isRectorat},
      isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
      isTeacher: function () { return this.$store.getters.isTeacher},
      username: function () { return this.$store.getters.user.firstname + ' ' + this.$store.getters.user.lastname },
      login: function () { return this.$store.getters.user.login}
    },

    methods: {
      showMainPage: function () {
        this.$router.push('/')
      },

      showProfilePage: function () {
        this.$router.push('/profile')
      },

      showUserCreationPage: function () {
        this.$router.push('/create/user')
      },

      showAddDiseaseInfoPage: function () {
        this.$router.push('/disease/info/add')
      },

      showDiseaseInfoPage: function () {
        this.$router.push('/disease/info')
      },

      showProcessedDiseasesPage: function () {
        this.$router.push('/diseases/status/processed')
      },

      showDiseasesListsPage: function () {
        this.$router.push('/diseases/table/choose')
      },

      showChooseGraphicPage: function () {
        this.$router.push('/diseases/graphics/choose')
      },

      logout: function () {
        this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
      }
    },

    created: function () {
      this.$http.interceptors.response.use(
          response => response,
          error => {
            const serverError = error.response.data;
            this.$store.dispatch('setServerError', serverError);

            if (error.response.data.errorCode === 210) {
              this.$store.dispatch("logout").then(() => this.$router.push('/login'))
            }

            return Promise.reject(error);
          }
      )
    },

    beforeCreate: function () {
      this.$store.dispatch("clearServerError")
      this.$store.dispatch("clearServerResponse")
    },

    beforeUpdate: function () {
      this.$store.dispatch("clearServerError")
      this.$store.dispatch("clearServerResponse")
    },

    destroyed: function () {
      this.$store.dispatch("clearServerError")
      this.$store.dispatch("clearServerResponse")
    },

    beforeMount() {
      if (this.isLoggedIn) {
        this.$store.dispatch("getUserInfo")
      }

      if (this.isDecanat) {
        this.$store.dispatch('getProcessedDiseasesList');
      }

      if (this.isStudent) {
        this.$store.dispatch('getActiveUserDisease');
      }
    }
  }
</script>

