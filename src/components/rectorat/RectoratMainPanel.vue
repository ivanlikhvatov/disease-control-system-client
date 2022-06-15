<template>
  <v-container>
    <main-slider-for-rectorat></main-slider-for-rectorat>
    <main-middle-panel-for-rectorat></main-middle-panel-for-rectorat>
  </v-container>
</template>

<script>

import MainMiddlePanelForRectorat from "@/components/rectorat/MainMiddlePanelForRectorat";
import MainSliderForRectorat from "@/components/rectorat/MainSliderForRectorat";

export default {
  name: "RectoratMainPanelView",

  components: {
    MainMiddlePanelForRectorat,
    MainSliderForRectorat,
  }
}
</script>

<style scoped>

</style>