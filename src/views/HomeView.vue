<template>
  <v-container>
    <decanat-main-panel v-if="isDecanat"></decanat-main-panel>
    <student-main-panel v-if="isStudent"></student-main-panel>
  </v-container>
</template>

<script>

import DecanatMainPanel from "@/components/decanat/DecanatMainPanel";
import StudentMainPanel from "@/components/student/StudentMainPanel";

export default {
  name: "HomeViewView",

  components: {
    DecanatMainPanel,
    StudentMainPanel
  },

  computed : {
    isAdmin: function () { return this.$store.getters.isAdmin},
    isDecanat: function () { return this.$store.getters.isDecanat},
    isCurator: function () { return this.$store.getters.isCurator},
    isRectorat: function () { return this.$store.getters.isRectorat},
    isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
    isTeacher: function () { return this.$store.getters.isTeacher},
    isStudent: function () { return this.$store.getters.isStudent}
  },
}
</script>
