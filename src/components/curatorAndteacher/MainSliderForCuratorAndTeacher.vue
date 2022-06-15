<template>
    <v-carousel
        class="mt-5"
        hide-delimiters
        show-arrows-on-hover
        cycle
    >
      <!--    style="border: 6px solid #2196F3; "-->

      <v-carousel-item style="border: 6px solid #2196F3; ">
        <CountDiseaseGraphic :chartName="'График болеющих за последние две недели'" :height="'80%'" :counts="countDiseaseGraphicInfo.counts" :labels="countDiseaseGraphicInfo.dates"/>
      </v-carousel-item>

      <v-carousel-item style="border: 6px solid #2196F3; ">
        <CountDiseaseByDepartmentDiagram :chartName="'Заболеваемость по группам'" :height="'80%'" :counts="countDiseaseByDepartmentDiagramInfo.counts" :labels="countDiseaseByDepartmentDiagramInfo.departments"/>
      </v-carousel-item>

      <v-carousel-item style="border: 6px solid #2196F3; ">
        <CountDiseaseByDiseaseTypeDiagram :chartName="'График заболеваемости по типам болезней в группах'" :counts="countDiseaseByDiseaseTypeDiagramInfo.counts" :labels="countDiseaseByDiseaseTypeDiagramInfo.diseases"/>
      </v-carousel-item>

    </v-carousel>
</template>

<script>
import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";
import CountDiseaseByDepartmentDiagram from "@/components/graphics/CountDiseaseByDepartmentDiagram";
import CountDiseaseByDiseaseTypeDiagram from "@/components/graphics/CountDiseaseByDiseaseTypeDiagram";

export default {
  name: "MainSliderForCuratorAndTeacherView",

  components: {
    CountDiseaseGraphic,
    CountDiseaseByDepartmentDiagram,
    CountDiseaseByDiseaseTypeDiagram
  },

  computed: {
    user() {
      return this.$store.getters.user
    },
  },

  data: () => ({
    countDiseaseGraphicInfo: null,
    countDiseaseByDepartmentDiagramInfo: null,
    countDiseaseByDiseaseTypeDiagramInfo: null
  }),

  methods: {
    fillDataForCountDiseaseGraphic() {

      this.countDiseaseGraphicInfo = {
        counts: this.$store.getters.user.additionalInfo.curatorAndTeacherAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick,
        dates: this.$store.getters.user.additionalInfo.curatorAndTeacherAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates
      }

    },

    fillDataForCountDiseaseByGroupsDiagram() {
      let countAndDepartmentNameList = this.$store.getters.user.additionalInfo.curatorAndTeacherAdditionalInfo.universityPartCountOfSicks

      let countList = []
      let departmentNameList = []

      for (var i = 0; i < countAndDepartmentNameList.length; i++) {
        countList.push(countAndDepartmentNameList[i].countOfSick)
        departmentNameList.push(countAndDepartmentNameList[i].name)
      }


      this.countDiseaseByDepartmentDiagramInfo = {
        counts: countList,
        departments: departmentNameList
      }

    },

    fillDataForCountDiseasesByDiseaseTypeDiagram() {
      let countAndDiseaseNameList = this.$store.getters.user.additionalInfo.curatorAndTeacherAdditionalInfo.diseaseTypeCountOfSicks

      let countList = []
      let diseaseNameList = []

      for (var i = 0; i < countAndDiseaseNameList.length; i++) {
        countList.push(countAndDiseaseNameList[i].countOfSick)
        diseaseNameList.push(countAndDiseaseNameList[i].diseaseName)
      }

      this.countDiseaseByDiseaseTypeDiagramInfo = {
        counts: countList,
        diseases: diseaseNameList
      }
    }
  },


  created() {
    this.fillDataForCountDiseaseGraphic()
    this.fillDataForCountDiseaseByGroupsDiagram()
    this.fillDataForCountDiseasesByDiseaseTypeDiagram()
  }
}
</script>

<style scoped>

</style>