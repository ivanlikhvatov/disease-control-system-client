<template>
  <v-container  mt-10>

    <v-row justify="space-around">
      <v-card width="400">
        <v-card-title>
          <p style="font-size: x-large; font-weight: bold; color: slategrey">Пожалуйста авторизируйтесь</p>
        </v-card-title>

        <v-card-text class="justify-center">
          <form class="login" @submit.prevent="login">
            <v-text-field
                v-model="studentNumber"
                name="studentNumber"
                label="Номер зачетки"
                required
            ></v-text-field>

            <v-text-field
                name="password"
                label="Пароль"
                v-model="password"
                type="password"
                required
            ></v-text-field>

            <v-btn
                color="info"
                class="mr-4"
                type="submit"
            >
              Войти
            </v-btn>

            <v-btn
                color="info"
                class="mr-4"
                @click="showRegistrationForm"
            >
              Зарегистрироваться
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  // import {mapState} from "vuex";

  export default {
    name: 'AuthView',

    data(){
      return {
        studentNumber : "",
        password : ""
      }
    },

    methods:{
      showRegistrationForm(){
        this.$router.push('/registration')
      },

      login: function () {
        let studentNumber = this.studentNumber
        let password = this.password
        this.$store.dispatch('login', { studentNumber, password })
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
      }
    }
  }
</script>