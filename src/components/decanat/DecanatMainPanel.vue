<template>
  <v-container>
    <main-slider-for-decanat></main-slider-for-decanat>
    <main-middle-panel-for-decanat></main-middle-panel-for-decanat>
  </v-container>
</template>

<script>
import MainSliderForDecanat from "@/components/decanat/MainSliderForDecanat";
import MainMiddlePanelForDecanat from "@/components/decanat/MainMiddlePanelForDecanat";

export default {
  name: "DecanatMainPanelView",

  components: {
    MainSliderForDecanat,
    MainMiddlePanelForDecanat,
  },
}
</script>

<style scoped>

</style>