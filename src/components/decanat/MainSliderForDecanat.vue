<template>

  <v-carousel
      cycle
      hide-delimiters
      show-arrows-on-hover
  >
<!--    {{user.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick}}-->
<!--    {{user.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates}}-->
    <v-carousel-item>
      <CountDiseaseGraphic :series="series" :options="options"/>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";

export default {
  name: "MainSliderForDecanat",

  components: {
    CountDiseaseGraphic,
  },

  computed: {
    user() {
      return this.$store.getters.user
    },
  },

  data: () => ({
    series: [{
      name: "Болеющие",
      data: null
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'График болеющих за последние две недели',
        align: 'center'
      },
      grid: {
        row: {
          opacity: 0.5
        },
      },
      xaxis: {
        categories: null,
      }
    },
  }),


  created() {
    this.series[0].data = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick
    this.options.xaxis.categories = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates

  }
}
</script>

<style scoped>

</style>