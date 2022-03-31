<template>
  <div id="app">
    <v-app>
      <v-app-bar app
                 color="primary"
                 dark
      >
        <v-toolbar-title>Система контроля заболеваемости</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="isLoggedIn" icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">

</style>

<script>
  export default {
    computed : {
      isLoggedIn : function () { return this.$store.getters.isLoggedIn},
    },

    methods: {
      logout: function () {
        this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
      }
    },

    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        // eslint-disable-next-line no-unused-vars
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch("logout")
          }
          throw err;
        });
      });
    },

    beforeCreate: function () {
      this.$store.dispatch("clearServerError")
    },

    beforeUpdate: function () {
      this.$store.dispatch("clearServerError")
    },

    destroyed: function () {
      this.$store.dispatch("clearServerError")
    },

    beforeMount() {
      if (!this.isLoggedIn){

        // alert(this.$route.path)
        // alert(this.$router.getMatchedComponents("activate"))
        // alert(ActivateAccount.props.toString())

        if (this.$route.query.activationCode && this.$route.path === '/registration/activate'){
          return;
        }

        this.$router.replace('/login')
      }
    }
  }
</script>

