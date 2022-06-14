
<template>
  <apexchart height="80%" type="pie" :options="options" :series="series"></apexchart>
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
  },

  data: () => ({
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
        text: null,
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
  }),

  methods: {
    fillData() {
      this.series = this.counts
      this.options.labels = this.labels
      this.options.title.text = this.chartName
    }
  },

  created() {
    this.fillData()
  },


}
</script>

<style scoped>

</style>