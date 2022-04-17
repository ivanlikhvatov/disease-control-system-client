<template>
  <v-container class="mt-10">
    {{user}}

    <v-btn
    @click="send"
    >
      dsds
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "ProfileView",

  computed: {
    user() {
      return this.$store.getters.user
    }
  },

  methods: {
    send: function () {
      this.$store.dispatch('getUserInfo');
    }
  }
}
</script>

<style scoped>

</style>