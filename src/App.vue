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
                @click="showMainPage"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Главная страница</v-list-item-title>
            </v-list-item>

            <v-list-item
              @click="showProfilePage"
            >
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item>

            <v-list-item
                v-if="isAdmin"
                @click="showUserCreationPage"
            >
              <v-list-item-icon>
                <v-icon>person_add</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Добавить пользователя</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view/>
      </v-main>
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
      isAdmin: function () { return this.$store.getters.isAdmin}
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
    }
  }
</script>

