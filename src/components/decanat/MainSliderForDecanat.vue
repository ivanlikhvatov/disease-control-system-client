<template>

  <v-carousel
      class="mt-5"
      hide-delimiters
      show-arrows-on-hover
  >
<!--    style="border: 6px solid #2196F3; "-->

    <v-carousel-item style="border: 6px solid #2196F3; ">
      <CountDiseaseGraphic :series="series" :options="options"/>
    </v-carousel-item>

    <v-carousel-item>
      <GraphicTmp/>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";
import GraphicTmp from "@/components/graphics/GraphicTmp";

export default {
  name: "MainSliderForDecanat",

  components: {
    CountDiseaseGraphic,
    GraphicTmp
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

      annotations: {

        xaxis: [{
          x: null,
          strokeDashArray: 0,
          borderColor: 'green',
          label: {
            borderColor: 'green',
            style: {
              color: '#fff',
              background: 'green',
            },
          }
        }],
      },

      chart: {
        // height: 350,
        type: 'line',
        background: 'white',
        // borderColor: '#90A4AE',
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
      },
      yaxis: [
        {
          labels: {
            formatter: function(val) {
              return val.toFixed(0);
            }
          }
        }
      ]
    },
  }),


  created() {
    this.series[0].data = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick
    this.options.xaxis.categories = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates
    this.options.annotations.xaxis[0].x = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates[6]
  }
}
</script>

<style scoped>

</style>