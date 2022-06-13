<template>

<!-- todo добавить cycle-->

  <v-carousel
      class="mt-5"
      hide-delimiters
      show-arrows-on-hover
      cycle
  >
<!--    style="border: 6px solid #2196F3; "-->

    <v-carousel-item style="border: 6px solid #2196F3; ">
      <CountDiseaseGraphic :height="'80%'" :series="countDiseaseGraphic.series" :options="countDiseaseGraphic.options"/>
    </v-carousel-item>

    <v-carousel-item style="border: 6px solid #2196F3; ">
      <CountDiseaseByDepartmentDiagram :series="countDiseaseByDepartmentDiagram.series" :options="countDiseaseByDepartmentDiagram.options"/>
    </v-carousel-item>

    <v-carousel-item style="border: 6px solid #2196F3; ">
      <CountDiseaseByDiseaseTypeDiagram :series="countDiseaseByDiseaseTypeDiagram.series" :options="countDiseaseByDiseaseTypeDiagram.options"/>
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";
import CountDiseaseByDepartmentDiagram from "@/components/graphics/CountDiseaseByDepartmentDiagram";
import CountDiseaseByDiseaseTypeDiagram from "@/components/graphics/CountDiseaseByDiseaseTypeDiagram";

export default {
  name: "MainSliderForDecanat",

  components: {
    CountDiseaseGraphic,
    CountDiseaseByDepartmentDiagram,
    CountDiseaseByDiseaseTypeDiagram
  },

  computed: {
    user() {
      return this.$store.getters.user
    },
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
          // height: 350,
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
          text: 'График болеющих за последние две недели',
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

    countDiseaseByDepartmentDiagram: {
      series: [{
        name: 'Болеющие',
        data: null
      }],

      options: {
        chart: {
          height: 350,
          type: 'bar',
          zoom: {
            enabled: false
          }
        },
        title: {
          offsetY: 10,
          text: 'Заболеваемость по кафедрам',
          align: 'center',

        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },

        grid: {
          row: {
            colors: ['#fff', '#f2f2f2']
          }
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: null,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Количество болеющих',
          },

          labels: {
            formatter: function(val) {
              return val.toFixed(0);
            }
          }
        },
        colors: ['#FF9800'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          },
        }
      },


    },

    countDiseaseByDiseaseTypeDiagram: {
      series: null,
      options: {
        chart: {
          width: 380,
          type: 'pie',
          toolbar: {
            show: true
          },
        },
        title: {
          offsetY: 10,
          text: 'График заболеваемости по типам болезней',
        },
        labels: null,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    },
  }),

  methods: {
    fillDataForCountDiseaseGraphic() {
      this.countDiseaseGraphic.series[0].data = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick
      this.countDiseaseGraphic.options.xaxis.categories = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates
      // this.countDiseaseGraphic.options.annotations.xaxis[0].x = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates[6]
    },

    fillDataForCountDiseaseByDepartmentDiagram() {
      let countAndDepartmentNameList = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.departmentCountOfSicks

      let countList = []
      let departmentNameList = []

      for (var i = 0; i < countAndDepartmentNameList.length; i++) {
        countList.push(countAndDepartmentNameList[i].countOfSick)
        departmentNameList.push(countAndDepartmentNameList[i].departmentName)
      }

      this.countDiseaseByDepartmentDiagram.series[0].data = countList
      this.countDiseaseByDepartmentDiagram.options.xaxis.categories = departmentNameList

    },

    fillDataForCountDiseasesByDiseaseTypeDiagram() {
      let countAndDiseaseNameList = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.diseaseTypeCountOfSicks

      let countList = []
      let diseaseNameList = []

      for (var i = 0; i < countAndDiseaseNameList.length; i++) {
        countList.push(countAndDiseaseNameList[i].countOfSick)
        diseaseNameList.push(countAndDiseaseNameList[i].diseaseName)
      }

      this.countDiseaseByDiseaseTypeDiagram.series = countList
      this.countDiseaseByDiseaseTypeDiagram.options.labels = diseaseNameList
    }
  },


  created() {
    this.fillDataForCountDiseaseGraphic()
    this.fillDataForCountDiseaseByDepartmentDiagram()
    this.fillDataForCountDiseasesByDiseaseTypeDiagram()
  }
}
</script>

<style scoped>

</style>