<template>
  <v-container>

    <div
        v-if="!serverError.message && !serverResponse.status"
        class="text-center mt-7"
    >
      <v-progress-circular
          :size="90"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
      <p class="mt-7" style="color:#2196F3 ">Пожалуйста подождите, идёт активация аккаунта...</p>
    </div>

    <div class="mt-14">
      <v-alert
          v-if="serverResponse.status && !serverError.message"
          outlined
          type="success"
          text
      >
        <p style="font-size: xx-large">Уважаемый {{userName}},</p>
        <p style="font-size: x-large">Поздравляем, Вы успешно подтвердили свою почту!</p>

        <v-btn
            outlined
            color="success"
            @click="showLogin"
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
        <p style="font-size: xx-large">Уважаемый {{userName}},</p>
        <p style="font-size: x-large">{{serverError.message}}</p>

        <v-btn
            v-if="serverError.errorCode === 216"
            outlined
            color="warning"
            @click="resendActivationCode"
        >
          Нажмите чтобы получить новый код
        </v-btn>
      </v-alert>

      <v-alert
          v-if="isError"
          type="error"
          outlined
          text
      >
        <p style="font-size: xx-large">Уважаемый {{userName}},</p>
        <p style="font-size: x-large">{{serverError.message}}</p>
      </v-alert>
    </div>

  </v-container>
</template>

<script>
export default {
  name: "ActivateAccountView",
  props: ['activationCode', 'userName'],

  computed: {

    serverResponse () {
      return this.$store.getters.serverResponse
    },

    serverError () {
      return this.$store.getters.serverError
    },

    isError() {
      return this.$store.getters.serverError.errorCode === 999
    },

    isWarning() {
      return this.serverError.message && this.$store.getters.serverError.errorCode !== 999
    },
  },

  methods: {
    showLogin() {
      this.$router.push('/login')
    },

    resendActivationCode() {
      this.$store.dispatch('resendActivationCode', this.activationCode)
          .catch(err => console.log(err))
      this.$router.push('/login')
    }
  },

  beforeMount() {
    this.$store.dispatch('activateAccount', this.activationCode)
        .catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>