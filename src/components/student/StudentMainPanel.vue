<template>
  <v-container>
    <v-carousel
        cycle
        hide-delimiters
        show-arrows-on-hover
    >
      <v-carousel-item

      >
        <v-sheet
            color="success"
            height="100%"
        >
          <v-row
              class="fill-height"
              align="center"
              justify="center"
          >
            <div class="text-h2"
                 v-if="diseaseInfo.id"
            >
              <p style="color: aliceblue">У Вас имеется активное заболевание<br> Не забудьте сообщить о выздоровлении</p>
            </div>
            <div class="text-h2"
                 v-else
            >
              <p style="color: aliceblue">По нашим данным вы здоровы! <br> Не забудьте сообщить если заболеете</p>
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "StudentMainPanelView",

  computed: {
    diseaseInfo() {
      return this.$store.getters.activeUserDiseaseInfo
    },
  }
}
</script>

<style scoped>

</style>