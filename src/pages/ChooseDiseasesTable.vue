<template>
  <v-container>
    <v-tabs
        background-color="transparent"
        color="primary"
        grow
    >
      <v-tab>
        Активные заболевания
      </v-tab>

      <v-tab v-if="isDecanat">
        Ожидают подтверждения
      </v-tab>

      <v-tab>
        Заболели сегодня
      </v-tab>

      <v-tab>
        Выздоровели сегодня
      </v-tab>

      <v-tab>
        Все заболевания
      </v-tab>

      <v-tab-item>
        <disease-active-list></disease-active-list>
      </v-tab-item>

      <v-tab-item v-if="isDecanat">
        <disease-processed-list></disease-processed-list>
      </v-tab-item>

      <v-tab-item>
        <got-sick-today-list></got-sick-today-list>
      </v-tab-item>

      <v-tab-item>
        <recover-today-list></recover-today-list>
      </v-tab-item>

      <v-tab-item>
        <all-diseases-list></all-diseases-list>
      </v-tab-item>
    </v-tabs>

  </v-container>
</template>

<script>
import DiseaseActiveList from "@/components/tables/DiseaseActiveList";
import DiseaseProcessedList from "@/components/tables/DiseaseProcessedList";
import GotSickTodayList from "@/components/tables/GotSickTodayList";
import RecoverTodayList from "@/components/tables/RecoverTodayList";
import AllDiseasesList from "@/components/tables/AllDiseasesList";

export default {

  name: "ChooseDiseasesTableView",

  data: () => ({
  }),

  components: {
    DiseaseActiveList,
    DiseaseProcessedList,
    GotSickTodayList,
    RecoverTodayList,
    AllDiseasesList
  },

  computed: {
    isAdmin: function () { return this.$store.getters.isAdmin},
    isDecanat: function () { return this.$store.getters.isDecanat},
    isCurator: function () { return this.$store.getters.isCurator},
    isRectorat: function () { return this.$store.getters.isRectorat},
    isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
    isTeacher: function () { return this.$store.getters.isTeacher},
    user: function () { return this.$store.getters.user},
  },

  beforeMount() {
    this.$store.dispatch('getAllDiseasesList');
  },

}
</script>

<style scoped>
</style>