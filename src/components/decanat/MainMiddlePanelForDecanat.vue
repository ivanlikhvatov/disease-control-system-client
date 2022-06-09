<template>
  <v-container class="mt-lg-16">

    <p style="font-size: x-large; font-weight: bold; color: slategrey; text-align: center">Оперативные данные</p>

    <v-row>
      <v-col
          cols="12"
          md="4"
      >
        <v-item>
          <v-card
              class="d-flex align-center"
              height="200"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4">
                  По состоянию на {{new Date(Date.now()).toLocaleDateString()}}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  На данный момент болеет
                </v-list-item-title>
                <v-list-item-subtitle>{{user.additionalInfo.decanatAdditionalInfo.countOfSickToday}} человек</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-item>
      </v-col>

      <v-col
          cols="12"
          md="4"
      >
        <v-item

        >
          <v-card
              class="d-flex align-center"
              height="200"
              @click="showAllSicksPage"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4">
                  Список болеющих студентов
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  Просмотр списка болеющих <br> студентов
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-item>
      </v-col>

      <v-col
          cols="12"
          md="4"
      >
        <v-item>
          <v-card
              class="d-flex align-center"
              height="200"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4">
                  Наиболее тяжелая ситуация
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  Самым эпидемеологически <br> неблагополучным <br> является направление ИФСТ
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainCardGroupForDecanat",

  computed: {
    user() {
      return this.$store.getters.user
    },
  },

  methods: {
    showAllSicksPage() {
      this.$router.push({ path: '/diseases/status/active'})
    }
  }
}
</script>

<style scoped>

</style>