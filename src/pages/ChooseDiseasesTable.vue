<template>
  <v-container>
    <v-tabs
        background-color="transparent"
        color="primary"
        grow
    >
      <v-tab
        @click="currentTableNumber = 0"
      >
        Активные заболевания
      </v-tab>

      <v-tab
          @click="currentTableNumber = 1"
      >
        Ожидают подтверждения
      </v-tab>

      <v-tab
          @click="currentTableNumber = 2"
      >
        Заболели сегодня
      </v-tab>

      <v-btn
          text
          class="align-self-center mr-4"
          color="primary"
          :loading="loading5"
          :disabled="loading5"
          @click="[loader = 'loading5', exportTable('xlsx')]"
      >
          Скачать
        <v-icon
            right
            dark
            color="primary"
        >
          mdi-cloud-upload
        </v-icon>
      </v-btn>

      <v-tab-item>
        <disease-active-list></disease-active-list>
      </v-tab-item>

      <v-tab-item>
        <disease-processed-list></disease-processed-list>
      </v-tab-item>

      <v-tab-item>
        <got-sick-today-list></got-sick-today-list>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import DiseaseActiveList from "@/components/tables/DiseaseActiveList";
import DiseaseProcessedList from "@/components/tables/DiseaseProcessedList";
import GotSickTodayList from "@/components/tables/GotSickTodayList";
import XLSX from "xlsx";

export default {

  name: "ChooseDiseasesTableView",

  data: () => ({
    currentTableNumber: 0,
    loading5: false,
    loader: null,
  }),

  components: {
    DiseaseActiveList,
    DiseaseProcessedList,
    GotSickTodayList
  },

  methods: {
    exportTable(type) {


      //todo поправить это если успею
      let tableIndex = this.currentTableNumber;

      if (document.getElementsByTagName("table").length < 3 && this.currentTableNumber === 2) {
        tableIndex = 1;
      }

      var elt = document.getElementsByTagName("table")[tableIndex];
      var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});

      return XLSX.writeFile(wb, ('disease_system_table.' + (type || 'xlsx')));
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
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>