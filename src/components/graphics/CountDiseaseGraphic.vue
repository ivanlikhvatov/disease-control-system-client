
<template>
  <apexchart height="80%" type="line" :options="options" :series="series"></apexchart>
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
    }
  },
}
</script>

<style scoped>

</style>