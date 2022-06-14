
<template>
  <apexchart :height="height" type="line" :options="options" :series="series"></apexchart>
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
      name: "Болеющие",
      data: null
    }],
    options: {
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
        text: null,
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
  }
}
</script>

<style scoped>

</style>