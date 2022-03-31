<template>
  <v-container>
    <v-alert
        v-if="!serverError"
        outlined
        type="success"
        text
    >
      <p style="font-size: xx-large">Уважаемый {{userName}},</p>
      <p style="font-size: x-large">Поздравляем, Вы успешно подтвердили свою почту!</p>

      <v-btn
          outlined
          color="success"
      >
        Нажмите чтобы войти
      </v-btn>
    </v-alert>

    <v-alert
        v-if="isWarning"
        type="warning"
        outlined
        text
    >
      I'm a warning alert.
      http://localhost:8081/registration/activate?activationCode=7879&userName=Ivan Ivanov Ivanich
    </v-alert>

    <v-alert
        v-if="isError"
        type="error"
        outlined
        text
    >
      I'm an error alert.
    </v-alert>

  </v-container>
</template>

<script>
export default {
  name: "ActivateAccountView",
  props: ['activationCode', 'userName'],

  computed: {
    serverError () {
      return this.$store.getters.serverError.message
    },

    isWarning() {
      return false;
    },

    isError() {
      return this.$store.getters.serverError.errorCode === 999
    }
  },

  beforeMount() {
    //Логика отправки запроса на сервер
    // alert(this.code)
    // alert(this.$route.query.activationCode)
  }
}
</script>

<style scoped>

</style>