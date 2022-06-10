<template>
  <v-container>
    <v-card
        max-width="500"
        class="mx-auto"
        elevation="4"
    >
      <v-card-title>
        Вам доступны следующие статистики
      </v-card-title>

      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="primary--text text--accent-4"
        >

          <v-list-item
              v-if="isDecanat"
              @click="showInstituteStatistic"
          >
            По институту
          </v-list-item>

          <v-list-item
              v-if="isDecanat"
              @click="showInstituteStatistic"
          >
            По направлениям
          </v-list-item>

          <v-list-item
              v-if="isDecanat"
              @click="showInstituteStatistic"
          >
            По группам
          </v-list-item>

<!--          <v-list-item-->
<!--              v-if="isDecanat"-->
<!--              @click="showInstituteStatistic"-->
<!--          >-->
<!--            В группе-->
<!--          </v-list-item>-->

        </v-list-item-group>
      </v-list>


    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ChooseStatisticView",

  data: () => ({
    group: null,
  }),

  computed : {
    isAdmin: function () { return this.$store.getters.isAdmin},
    isDecanat: function () { return this.$store.getters.isDecanat},
    isCurator: function () { return this.$store.getters.isCurator},
    isRectorat: function () { return this.$store.getters.isRectorat},
    isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
    isTeacher: function () { return this.$store.getters.isTeacher},
  },

  methods: {
    showInstituteStatistic() {

    }
  }
}
</script>

<style scoped>

</style>