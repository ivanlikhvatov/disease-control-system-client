<template>
  <v-container>
    <div
        v-if="!serverError.message && !serverResponse.status && processedDiseasesList.length === 0"
        class="text-center mt-7"
    >
      <v-progress-circular
          :size="90"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>

    <div
        v-else-if="processedDiseasesList.length !== 0"
    >
      <template v-for="diseaseInfo in processedDiseasesList">
        <v-list-item :key="diseaseInfo.id">
          <v-card
              class="mx-auto mt-5"
              max-width="500"
              min-width="400"
              elevation="4"
          >
            <v-card-title>
              <p>{{diseaseInfo.user.lastname}} {{diseaseInfo.user.firstname}} {{diseaseInfo.user.patronymic}}</p>
            </v-card-title>

            <v-card-subtitle>
              {{diseaseInfo.user.login}}
            </v-card-subtitle>

            <div v-if="diseaseInfo.disease">
              <v-card-title>
                Заболевание
              </v-card-title>

              <v-card-subtitle class="text--primary">
                <div>{{diseaseInfo.disease.name}}</div>
              </v-card-subtitle>
            </div>

            <div v-else>
              <v-card-title>
                Заболевание
              </v-card-title>

              <v-card-subtitle class="text--primary">
                <div>{{diseaseInfo.otherDiseaseInformation}}</div>
              </v-card-subtitle>
            </div>

            <v-card-title>
              Дата выздоровления
            </v-card-title>

            <v-card-subtitle class="text--primary">
              <div>{{diseaseInfo.dateOfRecovery}}</div>
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="showDiseaseApproveByDecanatPage(diseaseInfo)"
              >
                Подробнее
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-list-item>
      </template>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "DiseaseProcessedListView",

  data: () => ({

  }),

  computed: {
    serverResponse () {
      return this.$store.getters.serverResponse
    },

    serverError () {
      return this.$store.getters.serverError
    },

    processedDiseasesList() {
      return this.$store.getters.processedDiseasesList
    },
  },

  methods: {
    showDiseaseApproveByDecanatPage(diseaseInfo) {
      this.$router.push({ path: '/disease/approve/byDecanat', query: { diseaseInfo: diseaseInfo}})
    }
  },

  beforeMount() {
    this.$store.dispatch('getProcessedDiseasesList');
  },
}
</script>

<style scoped>

</style>