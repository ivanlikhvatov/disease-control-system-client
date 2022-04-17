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
    },

    methods: {
      showMainPage: function () {
        this.$router.push('/')
      },

      showProfilePage: function () {
        this.$router.push('/profile')
      },

      logout: function () {
        this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
      }
    },

    created: function () {

      //TODO не работает
      this.$http.interceptors.response.use(undefined, function (err) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config._isRetryRequest) {
            this.$store.dispatch("logout")
          }
          throw err;
        });
      });
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
      if (!this.isLoggedIn){

        if (this.$route.query.activationCode && this.$route.path === '/registration/activate'){
          return;
        }

        this.$router.replace('/login')
      } else {
        this.$store.dispatch("getUserInfo")
      }
    }
  }
</script>

