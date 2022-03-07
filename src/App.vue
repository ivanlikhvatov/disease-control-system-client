<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style lang="scss">

</style>

<script>

  import { mapState} from 'vuex'

  export default {
    computed: mapState(['profile']),

    beforeMount() {
      if (!this.profile){
        this.$router.replace('/auth')
      }
    }
  }
</script>

