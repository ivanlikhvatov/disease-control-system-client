<template>
  <v-container>
    <div v-if="graphicInfo.graphicType === 'byGroups'">

      <p style="text-align: center; color: #2196F3; font-size: xx-large; font-weight: bold">
        Графики заболеваемости по группам
      </p>

      <v-row>
        <v-col>
          <CountDiseaseByDepartmentDiagram :chartName="'Заболеваемость по группам'" :height="'350'" :counts="countDiseaseByGroupDiagramInfo.counts" :labels="countDiseaseByGroupDiagramInfo.groups"/>
        </v-col>
      </v-row>

      <p style="text-align: center; color: #2196F3; font-size: large; font-weight: bold">
        Подробная информация по группе {{graphicInfo.group.name}}
      </p>

      <v-row>
        <v-col>
          <CountDiseaseGraphic :chartName="'График болеющих'" :counts="countsOfDiseaseGraphicInfo.counts" :labels="countsOfDiseaseGraphicInfo.dates"/>
        </v-col>

        <v-col>
          <CountDiseaseByDiseaseTypeDiagram :counts="countsOfDiseasesByDiseaseDiagramInfo.counts" :labels="countsOfDiseasesByDiseaseDiagramInfo.diseases"/>
        </v-col>
      </v-row>
    </div>

    <div v-if="graphicInfo.graphicType === 'byDepartments'">

      <p style="text-align: center; color: #2196F3; font-size: xx-large; font-weight: bold">
        Графики заболеваемости по кафедрам
      </p>

      <v-row>
        <v-col>
          <CountDiseaseByDepartmentDiagram :chartName="'Заболеваемость по кафедрам'" :height="'350'" :counts="countDiseaseByGroupDiagramInfo.counts" :labels="countDiseaseByGroupDiagramInfo.groups"/>
        </v-col>
      </v-row>

      <p style="text-align: center; color: #2196F3; font-size: large; font-weight: bold">
        Подробная информация по кафедре {{graphicInfo.department.shortName}}
      </p>

      <v-row>
        <v-col>
          <CountDiseaseGraphic :chartName="'График количества болеющих по кафедре'" :counts="countsOfDiseaseGraphicInfo.counts" :labels="countsOfDiseaseGraphicInfo.dates"/>
        </v-col>

        <v-col>
          <CountDiseaseByDiseaseTypeDiagram :chartName="'График заболеваемости по типам болезней на кафедре'" :counts="countsOfDiseasesByDiseaseDiagramInfo.counts" :labels="countsOfDiseasesByDiseaseDiagramInfo.diseases"/>
        </v-col>
      </v-row>
    </div>

    <div v-if="graphicInfo.graphicType === 'byInstituteByDecanat'">

      <p style="text-align: center; color: #2196F3; font-size: xx-large; font-weight: bold">
        Графики заболеваемости по институту
      </p>

      <p style="text-align: center; color: #2196F3; font-size: large; font-weight: bold">
        Название вашего института {{graphicInfo.institute.shortName}}
      </p>

      <v-row class="mb-6">
        <v-col>
          <CountDiseaseGraphic :height="'350'" :chartName="'График количества болеющих по институту'" :counts="countsOfDiseaseGraphicInfo.counts" :labels="countsOfDiseaseGraphicInfo.dates"/>
        </v-col>
      </v-row>

      <CountDiseaseByDiseaseTypeDiagram :chartName="'График заболеваемости по типам болезней в инстиуте'" :counts="countsOfDiseasesByDiseaseDiagramInfo.counts" :labels="countsOfDiseasesByDiseaseDiagramInfo.diseases"/>
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
    countsOfDiseaseGraphicInfo: null,
    countsOfDiseasesByDiseaseDiagramInfo: null,
    countDiseaseByGroupDiagramInfo: null
  }),

  computed: {
    groupGraphicsInfo() {
      return this.$store.getters.groupGraphicsInfo
    },

    departmentGraphicsInfo() {
      return this.$store.getters.departmentGraphicsInfo
    },

    instituteGraphicsInfo() {
      return this.$store.getters.institutesGraphicsInfo
    }
  },

  methods: {
    fillDataForCountDiseaseGraphic(graphicData) {
      this.countsOfDiseaseGraphicInfo = {
        counts: graphicData.countOfDiseasesByDays.countsOfSick,
        dates: graphicData.countOfDiseasesByDays.dates
      }
    },

    fillDataForCountDiseaseDiagramByDisease(graphicData) {

      let countAndDiseaseNameList = graphicData.diseaseTypeCountOfSicks

      let countList = []
      let diseaseNameList = []

      for (var i = 0; i < countAndDiseaseNameList.length; i++) {
        countList.push(countAndDiseaseNameList[i].countOfSick)
        diseaseNameList.push(countAndDiseaseNameList[i].diseaseName)
      }
      this.countsOfDiseasesByDiseaseDiagramInfo = {
        counts: countList,
        diseases: diseaseNameList
      }
    },

    fillDataForCountDiseasesUniversityPartDiagram(graphicData) {
      let countAndGroupNameList = graphicData.universityPartCountOfSicks

      let countList = []
      let groupNameList = []

      for (var i = 0; i < countAndGroupNameList.length; i++) {
        countList.push(countAndGroupNameList[i].countOfSick)
        groupNameList.push(countAndGroupNameList[i].name)
      }


      this.countDiseaseByGroupDiagramInfo = {
        counts: countList,
        groups: groupNameList
      }
    }
  },

  created() {

    if (this.graphicInfo.graphicType === 'byGroups') {
      this.fillDataForCountDiseaseGraphic(this.groupGraphicsInfo)
      this.fillDataForCountDiseaseDiagramByDisease(this.groupGraphicsInfo)
      this.fillDataForCountDiseasesUniversityPartDiagram(this.groupGraphicsInfo)
    }

    if (this.graphicInfo.graphicType === 'byDepartments') {
      this.fillDataForCountDiseaseGraphic(this.departmentGraphicsInfo)
      this.fillDataForCountDiseaseDiagramByDisease(this.departmentGraphicsInfo)
      this.fillDataForCountDiseasesUniversityPartDiagram(this.departmentGraphicsInfo)
    }

    if (this.graphicInfo.graphicType === 'byInstituteByDecanat') {
      this.fillDataForCountDiseaseGraphic(this.instituteGraphicsInfo)
      this.fillDataForCountDiseaseDiagramByDisease(this.instituteGraphicsInfo)
    }
  }
}
</script>

<style scoped>

</style>