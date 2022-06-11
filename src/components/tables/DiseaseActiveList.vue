<template>
  <v-container>
    <v-card class="mt-5">
      <v-btn
          fab
          top
          right
          absolute
          color="primary"
          :loading="loading5"
          :disabled="loading5"
          @click="[loader = 'loading5', exportTable('xlsx')]"
      >
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>

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
          id="activeDisease"
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

import XLSX from "xlsx";
import moment from "moment";

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
      { text: 'Телефон', value: 'user.phoneNumber' },
      { text: 'Группа', value: 'user.group.name' },
      { text: 'Направление', value: 'user.group.directionProfile.instituteDirection.shortName'},
      { text: 'Кафедра', value: 'user.group.directionProfile.instituteDirection.department.shortName'},
      { text: 'Дата заболевания', value: 'dateOfDisease' },
      { text: 'Диагноз', value: 'disease.name'},

    ],

    loading5: false,
    loader: null,

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

  methods: {
    exportTable(type) {

      var dataTableVuetifyElem = document.getElementById("activeDisease");
      var elt = dataTableVuetifyElem.getElementsByTagName("table")[0];

      var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});

      let dateNow = moment().format('YYYY-MM-DD');

      return XLSX.writeFile(wb, ('Болеют_на_' + dateNow + '.' + (type || 'xlsx')));
    },
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },

  beforeMount() {
    this.$store.dispatch('getActiveDiseasesList');
  },
}
</script>

<style scoped>

</style>