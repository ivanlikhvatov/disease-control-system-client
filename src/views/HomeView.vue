<template>
  <v-container>
    <v-btn
        @click="sendRequest"
    >
      sdd
    </v-btn>

<!--    <p style="font-size: small; font-weight: bold; color: brown">{{infoMessage}}</p>-->
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'HomeView',
  methods: {
    ...mapActions(['firstRequest']),
    sendRequest(){
      this.firstRequest()
    }
  }
}
</script>
