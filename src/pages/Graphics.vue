<template>
  <v-container>
    <div v-if="graphicInfo.graphicType === 'byGroups'">

      <p style="text-align: center; color: #2196F3; font-size: xx-large; font-weight: bold">
        Графики заболеваемости по группам
      </p>

      <p style="text-align: center; color: #2196F3; font-size: large; font-weight: bold">
        Подробная информация по группе {{graphicInfo.group.name}}
      </p>

      <v-row>
        <v-col>
          <CountDiseaseByDepartmentDiagram :chartName="'Заболеваемость по группам'" :height="'350'" :counts="countDiseaseByGroupDiagramInfoInGroup.counts" :labels="countDiseaseByGroupDiagramInfoInGroup.groups"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <CountDiseaseGraphic :chartName="'График болеющих'" :counts="countsOfDiseaseGraphicInfoInGroup.counts" :labels="countsOfDiseaseGraphicInfoInGroup.dates"/>
        </v-col>

        <v-col>
          <CountDiseaseByDiseaseTypeDiagram :counts="countsOfDiseasesByDiseaseDiagramInGroup.counts" :labels="countsOfDiseasesByDiseaseDiagramInGroup.diseases"/>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>

import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";
import CountDiseaseByDiseaseTypeDiagram from "@/components/graphics/CountDiseaseByDiseaseTypeDiagram";
import CountDiseaseByDepartmentDiagram from "@/components/graphics/CountDiseaseByDepartmentDiagram";

export default {
  props: ['graphicInfo'],
  name: "GraphicsView",

  components: {
    CountDiseaseGraphic,
    CountDiseaseByDiseaseTypeDiagram,
    CountDiseaseByDepartmentDiagram,
  },

  data: () => ({
    countsOfDiseaseGraphicInfoInGroup: null,
    countsOfDiseasesByDiseaseDiagramInGroup: null,
    countDiseaseByGroupDiagramInfoInGroup: null




  }),

  computed: {
    groupGraphicsInfo () {
      return this.$store.getters.groupGraphicsInfo
    },
  },

  methods: {
    fillDataForCountDiseaseGraphicInGroup() {
      this.countsOfDiseaseGraphicInfoInGroup = {
        counts: this.$store.getters.groupGraphicsInfo.countOfDiseasesByDaysInGroup.countsOfSick,
        dates: this.$store.getters.groupGraphicsInfo.countOfDiseasesByDaysInGroup.dates
      }
    },

    fillDataForCountDiseaseDiagramByDiseaseInGroup() {

      let countAndDiseaseNameList = this.$store.getters.groupGraphicsInfo.diseaseTypeCountOfSicksInGroup

      let countList = []
      let diseaseNameList = []

      for (var i = 0; i < countAndDiseaseNameList.length; i++) {
        countList.push(countAndDiseaseNameList[i].countOfSick)
        diseaseNameList.push(countAndDiseaseNameList[i].diseaseName)
      }
      this.countsOfDiseasesByDiseaseDiagramInGroup = {
        counts: countList,
        diseases: diseaseNameList
      }
    },

    fillDataForCountDiseasesInGroupsDiagramForGroup() {
      let countAndGroupNameList = this.$store.getters.groupGraphicsInfo.groupsCountOfSicks

      let countList = []
      let groupNameList = []

      for (var i = 0; i < countAndGroupNameList.length; i++) {
        countList.push(countAndGroupNameList[i].countOfSick)
        groupNameList.push(countAndGroupNameList[i].name)
      }


      this.countDiseaseByGroupDiagramInfoInGroup = {
        counts: countList,
        groups: groupNameList
      }
    }
  },

  created() {

    if (this.graphicInfo.graphicType === 'byGroups') {
      this.fillDataForCountDiseaseGraphicInGroup()
      this.fillDataForCountDiseaseDiagramByDiseaseInGroup()
      this.fillDataForCountDiseasesInGroupsDiagramForGroup()
    }
  }
}
</script>

<style scoped>

</style>