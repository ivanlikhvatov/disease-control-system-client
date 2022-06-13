
<template>
  <apexchart :height="height" type="line" :options="options" :series="series"></apexchart>
</template>

<script>

export default {

  props: {
    series: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    height: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>

</style>