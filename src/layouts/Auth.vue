<template>
  <v-container  mt-10>

    <v-row justify="space-around">
      <v-card width="400">
        <v-card-title>
          <p style="font-size: x-large; font-weight: bold; color: slategrey">Пожалуйста авторизируйтесь</p>
        </v-card-title>

<!--        <v-card-text v-if="infoMessage">-->
<!--          <p style="font-size: small; font-weight: bold; color: brown">{{infoMessage}}</p>-->
<!--        </v-card-text>-->

        <v-card-text class="justify-center">
          <form action="/login" method="post">
            <v-text-field
                name="email"
                label="E-mail"
                required

            ></v-text-field>

            <v-text-field
                name="password"
                label="Пароль"
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

    methods:{
      showRegistrationForm(){
        this.$router.push('/registration')
      }
    }
  }
</script>