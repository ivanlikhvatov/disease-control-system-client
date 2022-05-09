<template>
  <v-container>
    <v-row justify="space-around mt-7">
      <v-card width="450">
        <v-card-title justify="space-around">
          <p style="font-size: x-large; font-weight: bold; color: slategrey">Введите данные</p>
        </v-card-title>

        <v-card-text class="justify-center">
          <form @submit.prevent="register">

            <v-text-field
                name="login"
                label="Номер зачетки"
                v-model="login"
                :error-messages="loginErrors"
                required
                @input="$v.login.$touch()"
                @blur="$v.login.$touch()"
            ></v-text-field>

            <v-text-field
                name="email"
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
                name="password"
                v-model="password"
                type="password"
                :error-messages="passwordErrors"
                label="Пароль"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <v-text-field
                name="password_confirmation"
                v-model="password_confirmation"
                type="password"
                :error-messages="passwordConfirmationErrors"
                label="Введите пароль еще раз"
                required
                @input="$v.password_confirmation.$touch()"
                @blur="$v.password_confirmation.$touch()"
            ></v-text-field>

            <p
                style="color: red"
                v-if="serverError"
            >
              {{serverError}}
            </p>

            <v-btn
                class="mr-4"
                color="info"
                type="submit"
            >
              Сохранить
            </v-btn>

            <v-btn
                class="mr-4"
                color="info"
                @click="clear"
            >
              Очистить
            </v-btn>

            <v-btn
                class="mr-4"
                color="info"
                @click="showLogin"
            >
              Назад
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: "RegistrationView",

  mixins: [validationMixin],

  validations: {
    login: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, maxLength: maxLength(20) },
    password_confirmation: { required, maxLength: maxLength(20) }
  },

  data: () => ({
    login: '',
    email: '',
    password: '',
    password_confirmation: ''
  }),

  computed: {
    serverError () {
      return this.$store.getters.serverError.message
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Формат e-mail некорректный')
      !this.$v.email.required && errors.push('Данное поле обязательно')

      return errors
    },
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.maxLength && errors.push('Данное поле должно содержать не более 10 символов')
      !this.$v.login.required && errors.push('Данное поле обязательно')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Данное поле должно содержать не более 20 символов')
      !this.$v.password.required && errors.push('Данное поле обязательно')
      return errors
    },

    passwordConfirmationErrors () {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.maxLength && errors.push('Данное поле должно содержать не более 20 символов')
      !this.$v.password_confirmation.required && errors.push('Данное поле обязательно')
      if (this.password !== this.password_confirmation) {
        errors.push('Пароли не совпадают')
      }
      return errors
    }
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.login = ''
      this.email = ''
      this.password = ''
      this.password_confirmation = ''
    },

    showLogin(){
      this.$router.push('/login')
    },

    isValid() {
      this.$v.$touch()
      return this.loginErrors.length === 0
          && this.emailErrors.length === 0
          && this.passwordErrors.length === 0
          && this.passwordConfirmationErrors.length === 0
    },

    register: function () {
      if (!this.isValid()) {
        return
      }

      let data = {
        login: this.login,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  },
}
</script>

<style>

</style>