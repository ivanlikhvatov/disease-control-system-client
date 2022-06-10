<template>
  <v-container>
    <v-card>
      <v-card-title>
        Больничные ожидающие подтверждения
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="diseasesList"
          :search="search"
          @click:row="showDiseaseApproveByDecanatPage"
          :footer-props="{
            'items-per-page-text':'максимальное количество строк',
            'pageText': '{0}-{1} из {2}',
            'items-per-page-all-text' : 'Все'
          }"
          no-data-text="Все больничные обработаны"
      >

      </v-data-table>
    </v-card>

  </v-container>
</template>

<script>

export default {
  name: "DiseaseProcessedListView",

  data: () => ({
    search: '',
    headers: [
      {
        text: 'Номер зачетки',
        align: 'start',
        sortable: false,
        value: 'user.login',
      },
      { text: 'Фамилия', value: 'user.lastname' },
      { text: 'Имя', value: 'user.firstname' },
      { text: 'Отчество', value: 'user.patronymic' },
      { text: 'Группа', value: 'user.group.name' },
      { text: 'Направление', value: 'user.group.directionProfile.instituteDirection.shortName'},
      { text: 'Дата заболевания', value: 'dateOfDisease' },
      { text: 'Дата выздоровления', value: 'dateOfRecovery' },
      { text: 'Диагноз', value: 'disease.name'},
    ],

  }),

  computed: {
    diseasesList () {
      return this.$store.getters.processedDiseasesList
    },

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
    },
  },

  beforeMount() {
    this.$store.dispatch('getProcessedDiseasesList');
  },
}
</script>

<style scoped>

</style>