<template>
  <v-container>
    <v-card>
      <v-card-title>
        Болеют сейчас
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
          :footer-props="{
            'items-per-page-text':'максимальное количество строк',
            'pageText': '{0}-{1} из {2}',
            'items-per-page-all-text' : 'Все'
          }"
          no-data-text="Больных нет"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: "DiseaseActiveListView",

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
      { text: 'Диагноз', value: 'disease.name'},

    ],

  }),

  computed: {
    diseasesList () {
      return this.$store.getters.activeDiseasesList
    },

    serverResponse () {
      return this.$store.getters.serverResponse
    },

    serverError () {
      return this.$store.getters.serverError
    },

  },

  beforeMount() {
    this.$store.dispatch('getActiveDiseasesList');
  },
}
</script>

<style scoped>

</style>