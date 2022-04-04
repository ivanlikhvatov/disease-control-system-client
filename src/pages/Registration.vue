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
                name="firstname"
                v-model="firstname"
                :error-messages="firstnameErrors"
                :counter="20"
                label="Имя"
                required
                @input="$v.firstname.$touch()"
                @blur="$v.firstname.$touch()"
            ></v-text-field>

            <v-text-field
                name="lastname"
                v-model="lastname"
                :error-messages="lastnameErrors"
                :counter="20"
                label="Фамилия"
                required
                @input="$v.lastname.$touch()"
                @blur="$v.lastname.$touch()"
            ></v-text-field>

            <v-text-field
                name="patronymic"
                v-model="patronymic"
                :error-messages="patronymicErrors"
                :counter="20"
                label="Отчество (при наличии)"
                @input="$v.patronymic.$touch()"
                @blur="$v.patronymic.$touch()"
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

            <v-select
                name="gender"
                v-model="gender"
                :items="genderItems"
                :error-messages="genderErrors"
                label="Пол"
                required
                @change="$v.gender.$touch()"
                @blur="$v.gender.$touch()"
            ></v-select>

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
                v-if="studentNumberErrors.length === 0
                && genderErrors.length === 0
                && firstnameErrors.length === 0
                && lastnameErrors.length === 0
                && patronymicErrors.length === 0
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
    firstname: { required, maxLength: maxLength(20) },
    lastname: { required, maxLength: maxLength(20) },
    patronymic: { maxLength: maxLength(20) },
    studentNumber: { required, maxLength: maxLength(10) },
    email: { required, email },
    gender: { required },
    password: { required, maxLength: maxLength(20) },
    password_confirmation: { required, maxLength: maxLength(20) }
  },

  data: () => ({
    firstname: '',
    lastname: '',
    patronymic: '',
    studentNumber: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: null,
    genderItems: [
      'муж',
      'жен',
    ]
  }),

  computed: {
    serverError () {
      return this.$store.getters.serverError.message
    },
    genderErrors () {
      const errors = []
      if (!this.$v.gender.$dirty) return errors
      !this.$v.gender.required && errors.push('Gender is required')
      return errors
    },
    firstnameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.maxLength && errors.push('Name must be at most 20 characters long')
      !this.$v.firstname.required && errors.push('Name is required.')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.lastname.$dirty) return errors
      !this.$v.lastname.maxLength && errors.push('Name must be at most 20 characters long')
      !this.$v.lastname.required && errors.push('Name is required.')
      return errors
    },
    patronymicErrors () {
      const errors = []
      if (!this.$v.patronymic.$dirty) return errors
      !this.$v.patronymic.maxLength && errors.push('Name must be at most 20 characters long')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')

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
      this.firstname = ''
      this.lastname = ''
      this.patronymic = ''
      this.studentNumber = ''
      this.email = ''
      this.password = ''
      this.password_confirmation = ''
      this.gender = null
    },

    showLogin(){
      this.$router.push('/login')
    },

    register: function () {
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        patronymic: this.patronymic,
        studentNumber: this.studentNumber,
        gender: this.gender,
        email: this.email,
        password: this.password
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
  }
}
</script>

<style>

</style>