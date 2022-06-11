
<template>
  <apexchart type="line" height="350" ref="chart" :options="chartOptions" :series="series"></apexchart>
</template>

<script>

export default {

  data: () => ({
    series: [{
      data: [0, 12, 3, 7, 10, 9]
    }],
    chartOptions: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: ['1', '12', '3', '7', '10', '9'],
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    },


  }),

  // props: {
  //   series: {
  //     type: Array,
  //     default: null
  //   },
  //   options: {
  //     type: Object,
  //     default: null
  //   }
  // },
}
</script>

<style scoped>

</style>