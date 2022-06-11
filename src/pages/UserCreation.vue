<template>
  <v-container>
    <v-card
        class="mx-auto mt-5"
        max-width="550"
        elevation="4"
    >
      <v-card-title justify="space-around">
        <p style="font-size: x-large; font-weight: bold; color: slategrey">Введите данные</p>
      </v-card-title>

      <v-card-text class="justify-center">
        <form @submit.prevent="createUser">
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

          <v-select
              name="roles"
              v-model="roles"
              :items="roleItems"
              :error-messages="roleErrors"
              label="Роли пользователя"
              multiple
              chips
              hint="Выберите роли, которые хотите предоставить пользователю"
              persistent-hint
              required
              @change="[$v.roles.$touch(), setInstituteItems()]"
              @blur="$v.roles.$touch()"
          ></v-select>

          <v-text-field
              v-if="roles.indexOf('Студент') !== -1"
              name="studentNumber"
              label="Номер студенческого билета"
              v-model="studentNumber"
              :error-messages="studentNumberErrors"
              required
              @input="$v.studentNumber.$touch()"
              @blur="$v.studentNumber.$touch()"
          ></v-text-field>
          <v-text-field
              v-else
              name="login"
              label="Логин пользователя"
              v-model="login"
              :error-messages="loginErrors"
              required
              @input="$v.login.$touch()"
              @blur="$v.login.$touch()"
          ></v-text-field>


          <div
              v-if="roles.indexOf('Студент') !== -1"
          >
            <v-select
                name="institutes"
                v-model="institute"
                :items="instituteItems"
                item-text="fullName"
                :error-messages="institutesErrors"
                label="Институт"
                required
                return-object
                @change="[$v.institute.$touch(), setDirectionItems()]"
                @blur="$v.institute.$touch()"
            >
            </v-select>

            <v-select
                v-if="institute.id"
                name="directions"
                v-model="direction"
                :items="directionItems"
                item-text="fullName"
                :error-messages="directionErrors"
                label="Направление обучения"
                required
                return-object
                @change="[$v.direction.$touch(), setProfileItems()]"
                @blur="$v.direction.$touch()"
            >
            </v-select>

            <v-select
                v-if="direction.id"
                name="profiles"
                v-model="profile"
                :items="profileItems"
                item-text="name"
                :error-messages="profileErrors"
                label="Профиль направления"
                required
                return-object
                @change="[$v.profile.$touch(), setGroupItems()]"
                @blur="$v.profile.$touch()"
            >
            </v-select>

            <v-select
                v-if="profile.id"
                name="groups"
                v-model="group"
                :items="groupItems"
                item-text="name"
                :error-messages="groupErrors"
                label="Группа"
                required
                return-object
                @change="[$v.group.$touch()]"
                @blur="$v.group.$touch()"
            >
            </v-select>

          </div>

          <div
              v-if="roles.indexOf('Деканат') !== -1"
          >
            <v-select
                name="institutes"
                v-model="institute"
                :items="instituteItems"
                item-text="fullName"
                :error-messages="institutesErrors"
                label="Институт"
                required
                return-object
                @change="$v.institute.$touch()"
                @blur="$v.institute.$touch()"
            >
            </v-select>
          </div>

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
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "UserCreationView",

  mixins: [validationMixin],

  validations: {
    firstname: { required, maxLength: maxLength(20) },
    lastname: { required, maxLength: maxLength(20) },
    patronymic: { maxLength: maxLength(20) },
    studentNumber: { required, maxLength: maxLength(10) },
    login: { required, maxLength: maxLength(10) },
    gender: { required },
    roles: { required },
    institute: { required },
    direction: { required },
    profile: { required },
    group: { required }
  },

  data: () => ({
    firstname: '',
    lastname: '',
    patronymic: '',
    login: '',
    studentNumber: '',
    gender: '',
    roles: [],
    institute: {},
    direction: {},
    profile: {},
    group: {},

    genderItems: [
      'муж',
      'жен',
    ],
    roleItems: [
        'Студент',
        'Куратор',
        'Кафедрально ответственный',
        'Ректорат',
        'Деканат',
        'Учитель',
        'Администратор'
    ],
  }),

  computed: {
    serverError () {
      return this.$store.getters.serverError.message
    },
    genderErrors () {
      const errors = []
      if (!this.$v.gender.$dirty) return errors
      !this.$v.gender.required && errors.push('Данное поле обязательно')
      return errors
    },
    roleErrors () {
      const errors = []
      if (!this.$v.roles.$dirty) return errors
      !this.$v.roles.required && errors.push('Данное поле обязательно')
      return errors
    },
    institutesErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') === -1 && this.roles.indexOf('Деканат') === -1){
        return errors
      }

      if (!this.$v.institute.$dirty) return errors
      !this.$v.institute.required && errors.push('Данное поле обязательно')

      return errors
    },
    directionErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') === -1){
        return errors
      }

      if (!this.$v.direction.$dirty) return errors
      !this.$v.direction.required && errors.push('Данное поле обязательно')
      return errors
    },
    profileErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') === -1){
        return errors
      }

      if (!this.$v.profile.$dirty) return errors
      !this.$v.profile.required && errors.push('Данное поле обязательно')
      return errors
    },
    groupErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') === -1){
        return errors
      }

      if (!this.$v.group.$dirty) return errors
      !this.$v.group.required && errors.push('Данное поле обязательно')
      return errors
    },
    firstnameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.maxLength && errors.push('Данное поле должно содержать не более 20 символов')
      !this.$v.firstname.required && errors.push('Данное поле обязательно')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.lastname.$dirty) return errors
      !this.$v.lastname.maxLength && errors.push('Данное поле должно содержать не более 20 символов')
      !this.$v.lastname.required && errors.push('Данное поле обязательно')
      return errors
    },
    patronymicErrors () {
      const errors = []
      if (!this.$v.patronymic.$dirty) return errors
      !this.$v.patronymic.maxLength && errors.push('Данное поле должно содержать не более 20 символов')
      return errors
    },
    studentNumberErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') === -1){
        return errors
      }

      if (!this.$v.studentNumber.$dirty) return errors
      !this.$v.studentNumber.maxLength && errors.push('Данное поле должно содержать не более 10 символов')
      !this.$v.studentNumber.required && errors.push('Данное поле обязательно')
      return errors
    },

    loginErrors () {
      const errors = []

      if (this.roles.indexOf('Студент') !== -1){
        return errors
      }

      if (!this.$v.login.$dirty) return errors
      !this.$v.login.maxLength && errors.push('Данное поле должно содержать не более 10 символов')
      !this.$v.login.required && errors.push('Данное поле обязательно')
      return errors
    },

    instituteItems () {
      return this.$store.getters.allInstitutes;
    },
    directionItems() {
      return this.$store.getters.directionsBySelectedInstitute
    },
    profileItems() {
      return this.$store.getters.profilesBySelectedDirection
    },
    groupItems() {
      return this.$store.getters.groupsBySelectedProfiles
    }
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.firstname = ''
      this.lastname = ''
      this.patronymic = ''
      this.studentNumber = ''
      this.login = ''
      this.gender = []
      this.roles = []
      this.institute = {}
      this.direction = {}
      this.profile = {}
      this.group = {}
    },

    setInstituteItems () {
      if (this.roles.indexOf('Студент') !== -1 || this.roles.indexOf('Деканат') !== -1) {
        this.$store.dispatch('getInstitutes')
      }else {
        this.institute = {};
        this.direction = {};
        this.profile = {};
        this.group = {};
      }
    },

    setDirectionItems() {
      if (this.institute.id) {
        this.$store.dispatch('getDirections', this.institute.id)
      } else {
        this.institute = {};
        this.direction = {};
        this.profile = {};
        this.group = {};
      }
    },

    setProfileItems() {
      if (this.direction.id) {
        this.$store.dispatch('getProfiles', this.direction.id)
      } else {
        this.direction = {};
        this.profile = {};
        this.group = {}
      }
    },

    setGroupItems() {
      if (this.profile.id) {
        this.$store.dispatch('getGroups', this.profile.id)
      } else {
        this.profile = {};
        this.group = {}
      }
    },

    isValid() {
      this.$v.$touch()

      return this.studentNumberErrors.length === 0
          && this.genderErrors.length === 0
          && this.firstnameErrors.length === 0
          && this.lastnameErrors.length === 0
          && this.patronymicErrors.length === 0
          && this.loginErrors.length === 0
          && this.roleErrors.length === 0
          && this.institutesErrors.length === 0
          && this.directionErrors.length === 0
          && this.profileErrors.length === 0
          && this.groupErrors.length === 0;
    },

    createUser () {
      if (!this.isValid()){
        return
      }

      if (this.login === '') {
        this.login = this.studentNumber;
      }

      let data;

      if (this.roles.indexOf('Студент') !== -1) {
        data = {
          firstname: this.firstname,
          lastname: this.lastname,
          patronymic: this.patronymic,
          login: this.login,
          gender: this.gender,
          roles: this.roles,
          group: this.group
        }
      }

      if (this.roles.indexOf('Деканат') !== -1) {
        data = {
          firstname: this.firstname,
          lastname: this.lastname,
          patronymic: this.patronymic,
          login: this.login,
          gender: this.gender,
          roles: this.roles,
          institute: this.institute
        }
      }

      this.$store.dispatch('createUser', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>