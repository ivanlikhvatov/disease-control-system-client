<template>
  <v-container>
    <main-slider-for-curator-and-teacher></main-slider-for-curator-and-teacher>
    <main-middle-panel-for-curator-and-teacher></main-middle-panel-for-curator-and-teacher>
  </v-container>
</template>

<script>

import MainSliderForCuratorAndTeacher from "@/components/curatorAndteacher/MainSliderForCuratorAndTeacher";
import MainMiddlePanelForCuratorAndTeacher from "@/components/curatorAndteacher/MainMiddlePanelForCuratorAndTeacher";

export default {
  name: "CuratorAndTeacherMainPanelView",

  components: {
    MainSliderForCuratorAndTeacher,
    MainMiddlePanelForCuratorAndTeacher,
  }
}
</script>

<style scoped>

</style>