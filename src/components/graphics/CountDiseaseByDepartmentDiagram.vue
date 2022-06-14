
<template>
  <apexchart :height="height" type="bar" :options="options" :series="series"></apexchart>
</template>

<script>

export default {
  props: {
    counts: {
      type: Array,
      default: null
    },
    labels: {
      type: Array,
      default: null
    },
    chartName: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },


  data: () => ({
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
        text: null,
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
  }),


  methods: {
    fillData() {
      this.series[0].data = this.counts
      this.options.xaxis.categories = this.labels
      this.options.title.text = this.chartName
    },
  },

  created() {
    this.fillData()
  },

}
</script>

<style scoped>

</style>