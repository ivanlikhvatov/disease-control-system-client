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
          id="processedDiseases"
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

import XLSX from "xlsx";
import moment from "moment";

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
      { text: 'Телефон', value: 'user.phoneNumber' },
      { text: 'Группа', value: 'user.group.name' },
      { text: 'Направление', value: 'user.group.directionProfile.instituteDirection.shortName'},
      { text: 'Кафедра', value: 'user.group.directionProfile.instituteDirection.department.shortName'},
      { text: 'Дата заболевания', value: 'dateOfDisease' },
      { text: 'Дата выздоровления', value: 'dateOfRecovery' },
      { text: 'Диагноз', value: 'disease.name'},
    ],

    loading5: false,
    loader: null,

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
  },

  methods: {
    showDiseaseApproveByDecanatPage(diseaseInfo) {
      this.$router.push({ path: '/disease/approve/byDecanat', query: { diseaseInfo: diseaseInfo}})
    },

    exportTable(type) {
      var dataTableVuetifyElem = document.getElementById("processedDiseases");
      var elt = dataTableVuetifyElem.getElementsByTagName("table")[0];

      var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});

      let dateNow = moment().format('YYYY-MM-DD');

      return XLSX.writeFile(wb, ('Список_заболеваний_подлежащих_проверке_' + dateNow + '.' + (type || 'xlsx')));
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
    this.$store.dispatch('getProcessedDiseasesList');
  },
}
</script>

<style scoped>

</style>