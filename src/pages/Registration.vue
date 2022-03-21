<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="450">
        <v-card-title justify="space-around">
          <p style="font-size: x-large; font-weight: bold; color: slategrey">Введите данные</p>
        </v-card-title>

        <v-card-text class="justify-center">
          <form @submit.prevent="register">
            <v-text-field
                name="name"
                v-model="name"
                :error-messages="nameErrors"
                :counter="20"
                label="Имя"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field>

            <v-text-field
                name="studentNumber"
                label="Номер зачетки"
                v-model="studentNumber"
                :error-messages="studentNumberErrors"
                required
                @input="$v.studentNumber.$touch()"
                @blur="$v.studentNumber.$touch()"
            ></v-text-field>

            <v-text-field
                name="password"
                v-model="password"
                :error-messages="passwordErrors"
                label="Пароль"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>
            <v-text-field
                name="password_confirmation"
                v-model="password_confirmation"
                :error-messages="passwordConfirmationErrors"
                label="Введите пароль еще раз"
                required
                @input="$v.password_confirmation.$touch()"
                @blur="$v.password_confirmation.$touch()"
            ></v-text-field>

            <v-select
                name="gender"
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Пол"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
            ></v-select>

            <v-btn
                class="mr-4"
                color="info"
                type="submit"
                v-if="studentNumberErrors.length === 0
                && selectErrors.length === 0
                && nameErrors.length === 0
                && passwordErrors.length === 0
                && passwordConfirmationErrors.length === 0"
            >
              Сохранить
            </v-btn>

            <v-btn
                class="mr-4"
                color="info"
                v-else
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
                @click="showAuth"
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
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "RegistrationView",

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    studentNumber: { required, maxLength: maxLength(10) },
    select: { required },
    password: { required, maxLength: maxLength(20) },
    password_confirmation: { required, maxLength: maxLength(20) }
  },

  data: () => ({
    name: '',
    studentNumber: '',
    password: '',
    password_confirmation : '',
    select: null,
    items: [
      'муж',
      'жен',
    ],
    checkbox: false,
    rules: [
      value => !value || value.size < 10000000 || 'Avatar size should be less than 10 MB!',
    ],
  }),

  computed: {
    ...mapState(['infoMessage']),
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 20 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    studentNumberErrors () {
      const errors = []
      if (!this.$v.studentNumber.$dirty) return errors
      !this.$v.studentNumber.maxLength && errors.push('studentNumber must be at most 10 characters long')
      !this.$v.studentNumber.required && errors.push('studentNumber is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Password must be at most 20 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },

    passwordConfirmationErrors () {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.maxLength && errors.push('Password must be at most 20 characters long')
      !this.$v.password_confirmation.required && errors.push('Password is required.')
      if (this.password !== this.password_confirmation) {
        errors.push('Пароли не совпадают')
      }
      return errors
    }
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.select = null
      this.checkbox = false
    },

    showAuth(){
      this.$router.push('/auth')
    },

    register: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  },

  beforeMount() {
    if (!this.isLoggedIn){
      this.$router.replace('/registration')
    }
    this.infoMessage = null
  }
}
</script>

<style>

</style>