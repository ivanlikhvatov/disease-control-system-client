<template>
  <v-container>
    <v-card>

      <v-card-title>
        <v-btn
            :loading="loading5"
            :disabled="loading5"
            small
            color="blue-grey"
            class="ma-2 white--text"
            fab
            @click="[loader = 'loading5', exportTable('xlsx')]"
        >
          <v-icon dark>
            cloud_upload
          </v-icon>
        </v-btn>
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
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import XLSX from "xlsx";

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
      { text: 'Имя', value: 'user.firstname' },
      { text: 'Фамилия', value: 'user.lastname' },
      { text: 'Отчество', value: 'user.patronymic' },
      { text: 'Группа', value: 'user.group.name' },
      { text: 'Направление', value: 'user.group.directionProfile.instituteDirection.shortName'},
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

  beforeMount() {
    this.$store.dispatch('getProcessedActiveList');
  },

  methods: {
    exportTable(type) {
      var elt = document.getElementsByTagName("table")[0];
      var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});

      return XLSX.writeFile(wb, ('болеют_сейчас.' + (type || 'xlsx')));
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
}
</script>

<style scoped>

</style>