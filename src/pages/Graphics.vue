<template>
  <v-container>
<!--    {{groupGraphicsInfo.countOfDiseasesByDaysInGroup.dates}}-->
<!--    {{groupGraphicsInfo.countOfDiseasesByDaysInGroup.countsOfSick}}-->


    <CountDiseaseGraphic :height="'350'" :series="countDiseaseGraphic.series" :options="countDiseaseGraphic.options"/>
  </v-container>
</template>

<script>

import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";

export default {
  props: ['graphicInfo'],
  name: "GraphicsView",

  components: {
    CountDiseaseGraphic,
  },

  data: () => ({
    countDiseaseGraphic: {
      series: [{
        name: "Болеющие",
        data: null
      }],
      options: {

        // annotations: {
        //   xaxis: [{
        //     x: null,
        //     strokeDashArray: 0,
        //     borderColor: 'green',
        //     label: {
        //       borderColor: 'green',
        //       style: {
        //         color: '#fff',
        //         background: 'green',
        //       },
        //     }
        //   }],
        // },

        chart: {
          height: 150,
          type: 'line',
          // background: 'white',
          // borderColor: '#90A4AE',
          zoom: {
            enabled: false
          }
        },

        colors: ['#F44336'],

        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          offsetY: 10,
          text: 'График болеющих в группе',
          align: 'center',

        },
        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
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
    },
  }),

  computed: {
    groupGraphicsInfo () {
      return this.$store.getters.groupGraphicsInfo
    },
  },

  methods: {
    fillDataForCountDiseaseGraphic() {
      this.countDiseaseGraphic.series[0].data = this.$store.getters.groupGraphicsInfo.countOfDiseasesByDaysInGroup.countsOfSick
      this.countDiseaseGraphic.options.xaxis.categories = this.$store.getters.groupGraphicsInfo.countOfDiseasesByDaysInGroup.dates
      // this.countDiseaseGraphic.options.annotations.xaxis[0].x = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates[6]
    },
  },

  created() {
    this.fillDataForCountDiseaseGraphic()
  }
}
</script>

<style scoped>

</style>