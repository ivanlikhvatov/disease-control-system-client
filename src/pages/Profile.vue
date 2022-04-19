<template>
  <v-container class="mt-10">
    {{user}}
  </v-container>
</template>

<script>
export default {
  name: "ProfileView",

  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>