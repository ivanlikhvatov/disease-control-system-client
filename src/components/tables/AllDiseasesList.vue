<template>
  <v-container>
    <v-card class="mt-5">

      <v-dialog
          v-model="isDetailedInfoPanel"
          max-width="550"
      >
        <v-card
            v-if="detailedInfo.user"
        >
          <v-toolbar
              color="primary"
              dark
          >Подробная информация</v-toolbar>

          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.lastname}} {{detailedInfo.user.firstname}} {{detailedInfo.user.patronymic}}</v-list-item-title>
                <v-list-item-subtitle>ФИО</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.login}}</v-list-item-title>
                <v-list-item-subtitle>Номер зачетки</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>+7{{detailedInfo.user.phoneNumber}}</v-list-item-title>
                <v-list-item-subtitle>Номер Телефона</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.email}}</v-list-item-title>
                <v-list-item-subtitle>E-mail</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.group.name}}</v-list-item-title>
                <v-list-item-subtitle>Группа обученния</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.group.directionProfile.instituteDirection.shortName}}</v-list-item-title>
                <v-list-item-subtitle>Направление обучения</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.group.directionProfile.instituteDirection.department.shortName}}</v-list-item-title>
                <v-list-item-subtitle>Кафедра</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.user.group.directionProfile.instituteDirection.institute.shortName}}</v-list-item-title>
                <v-list-item-subtitle>Институт</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.disease">
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.disease.name}}</v-list-item-title>
                <v-list-item-subtitle>Заболевание</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-else>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.otherDiseaseInformation}}</v-list-item-title>
                <v-list-item-subtitle>Описание болезни</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.dateOfDisease}}</v-list-item-title>
                <v-list-item-subtitle>Дата начала болезни</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.dateOfRecovery">
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.dateOfRecovery}}</v-list-item-title>
                <v-list-item-subtitle>Дата выздоровления</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.status.description}}</v-list-item-title>
                <v-list-item-subtitle>Статус заболевания</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.approveType">
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.approveType.description}}</v-list-item-title>
                <v-list-item-subtitle>Тип подтверждения</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.approveAuthor">
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.approveAuthor.lastname}} {{detailedInfo.approveAuthor.firstname}} {{detailedInfo.approveAuthor.patronymic}}</v-list-item-title>
                <v-list-item-subtitle>Кем подтверждено</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.rejectAuthor">
              <v-list-item-content>
                <v-list-item-title>{{detailedInfo.rejectAuthor.lastname}} {{detailedInfo.rejectAuthor.firstname}} {{detailedInfo.rejectAuthor.patronymic}}</v-list-item-title>
                <v-list-item-subtitle>Кем отклонено</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="detailedInfo.rejectCause">
              <v-list-item-content>
                <p>{{detailedInfo.rejectCause}}</p>
                <v-list-item-subtitle>Причина отклонения</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>

          <v-card-actions v-if="detailedInfo.scannedCertificateInBase64">
            <v-btn
                :download=detailedInfo.user.login
                :href=detailedInfo.scannedCertificateInBase64
                :loading="loading4"
                :disabled="loading4"
                color="blue-grey"
                class="ma-2 white--text"
                @click="loader = 'loading4'"
            >
              Скачать справку
              <v-icon
                  right
                  dark
              >
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>

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
        Заболевания за все время
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
          id="allDisease"
          :headers="headers"
          :items="diseasesList"
          :search="search"
          @click:row="showMoreInformation"
          :footer-props="{
            'items-per-page-text':'максимальное количество строк',
            'pageText': '{0}-{1} из {2}',
            'items-per-page-all-text' : 'Все'
          }"
          no-data-text="Информации нет"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
import moment from "moment";

export default {
  name: "AllDiseasesList",

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
      { text: 'Группа', value: 'user.group.name' },
      { text: 'Кафедра', value: 'user.group.directionProfile.instituteDirection.department.shortName'},
      { text: 'Институт', value: 'user.group.directionProfile.instituteDirection.institute.shortName'},
      { text: 'Дата заболевания', value: 'dateOfDisease' },
      { text: 'Дата выздоровления', value: 'dateOfRecovery' },
      { text: 'Диагноз', value: 'disease.name'},
      { text: 'Статус', value: 'status.description'},
    ],

    loading5: false,
    loading4: false,
    loader: null,
    detailedInfo: {},
    isDetailedInfoPanel: false
  }),

  computed: {
    diseasesList () {
      return this.$store.getters.allDiseasesList
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

      var dataTableVuetifyElem = document.getElementById("allDisease");
      var elt = dataTableVuetifyElem.getElementsByTagName("table")[0];

      var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});

      let dateNow = moment().format('YYYY-MM-DD');

      return XLSX.writeFile(wb, ('Все_заболевания_' + dateNow + '.' + (type || 'xlsx')));
    },

    showMoreInformation(diseaseInfo) {
      this.detailedInfo = diseaseInfo
      this.isDetailedInfoPanel = true
    }
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
    this.$store.dispatch('getAllDiseasesList');
  },
}
</script>

<style scoped>

</style>