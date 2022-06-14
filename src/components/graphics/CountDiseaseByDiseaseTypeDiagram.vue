
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
    }
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
  }),

  methods: {
    fillData() {
      this.series = this.counts
      this.options.labels = this.labels
    }
  },

  created() {
    this.fillData()
  },


}
</script>

<style scoped>

</style>