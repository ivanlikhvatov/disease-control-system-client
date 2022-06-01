<template>
  <v-container>
    <main-slider-for-decanat v-if="isDecanat"></main-slider-for-decanat>
    <main-middle-panel-for-decanat v-if="isDecanat"></main-middle-panel-for-decanat>
  </v-container>
</template>

<script>
import MainSliderForDecanat from "@/components/decanat/MainSliderForDecanat";
import MainMiddlePanelForDecanat from "@/components/decanat/MainMiddlePanelForDecanat";

export default {
  name: "HomeViewView",

  components: {
    MainSliderForDecanat,
    MainMiddlePanelForDecanat,
  },

  computed : {
    isAdmin: function () { return this.$store.getters.isAdmin},
    isDecanat: function () { return this.$store.getters.isDecanat},
    isCurator: function () { return this.$store.getters.isCurator},
    isRectorat: function () { return this.$store.getters.isRectorat},
    isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
    isTeacher: function () { return this.$store.getters.isTeacher},
  },
}
</script>
