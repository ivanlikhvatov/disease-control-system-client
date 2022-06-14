<template>

<!-- todo добавить cycle-->

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
      <CountDiseaseByDepartmentDiagram :chartName="'Заболеваемость по кафедрам'" :height="'80%'" :counts="countDiseaseByDepartmentDiagramInfo.counts" :labels="countDiseaseByDepartmentDiagramInfo.departments"/>
    </v-carousel-item>

    <v-carousel-item style="border: 6px solid #2196F3; ">
      <CountDiseaseByDiseaseTypeDiagram :counts="countDiseaseByDiseaseTypeDiagramInfo.counts" :labels="countDiseaseByDiseaseTypeDiagramInfo.diseases"/>
    </v-carousel-item>

  </v-carousel>
</template>

<script>
import CountDiseaseGraphic from "@/components/graphics/CountDiseaseGraphic";
import CountDiseaseByDepartmentDiagram from "@/components/graphics/CountDiseaseByDepartmentDiagram";
import CountDiseaseByDiseaseTypeDiagram from "@/components/graphics/CountDiseaseByDiseaseTypeDiagram";

export default {
  name: "MainSliderForDecanat",

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
        counts: this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.countsOfSick,
        dates: this.$store.getters.user.additionalInfo.decanatAdditionalInfo.countOfDiseasesByDaysForTwoWeeks.dates
      }

    },

    fillDataForCountDiseaseByDepartmentDiagram() {
      let countAndDepartmentNameList = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.departmentCountOfSicks

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
      let countAndDiseaseNameList = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.diseaseTypeCountOfSicks

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
    this.fillDataForCountDiseaseByDepartmentDiagram()
    this.fillDataForCountDiseasesByDiseaseTypeDiagram()
  }
}
</script>

<style scoped>

</style>