<template>
  <v-container>
    <v-card
        max-width="500"
        class="mx-auto mt-5"
        elevation="4"
    >
      <v-card-title justify="space-around">
        <p style="font-size: x-large; font-weight: bold; color: #4CAF50">Измените данные</p>
      </v-card-title>

      <v-card-text class="justify-center">
        <form @submit.prevent="editDiseaseInfo">

          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  :error-messages="dateErrors"
                  required
                  color="success"
                  v-model="date"
                  label="Когда вы заболели"
                  append-icon="event"
                  outlined
                  readonly
                  @change="$v.date.$touch()"
                  @blur="$v.date.$touch()"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                ref="picker"
                v-model="date"
                color="success"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
            ></v-date-picker>
          </v-menu>


          <v-select
              name="diseases"
              color="success"
              v-model="disease"
              :items="diseaseItems"
              :error-messages="diseaseErrors"
              required
              label="Заболевание"
              hint="Выберите из списка Ваше заболевание"
              return-object
              item-text="name"
              @change="[$v.disease.$touch(), checkIsOtherSelected()]"
              @blur="$v.disease.$touch()"
          >
          </v-select>

          <v-textarea
              v-if="isDiseaseOther"
              v-model="otherDiseaseInformation"
              :error-messages="otherDiseaseInformationErrors"
              color="success"
              required
              :counter="100"
              background-color="green lighten-4"
              filled
              name="input-7-4"
              label="Расскажите чем вы заболели"
              @change="$v.otherDiseaseInformation.$touch()"
              @blur="$v.otherDiseaseInformation.$touch()"
          ></v-textarea>

          <p
              style="color: red"
              v-if="serverError"
          >
            {{serverError}}
          </p>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="success"
              type="submit"
          >
            Сохранить
          </v-btn>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="success"
              @click="clear"
          >
            Очистить
          </v-btn>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="success"
              @click="showDiseaseInfoPage"
          >
            Назад
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {validationMixin} from "vuelidate";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "DiseaseInfoEditView",

  mixins: [validationMixin],

  validations: {
    disease: { required },
    date: { required },
    otherDiseaseInformation: { required, maxLength: maxLength(100) }
  },

  data: () => ({
    disease: {},
    diseaseInfoId: '',
    otherDiseaseInformation: null,
    date: '',

    isDiseaseOther: false,
    menu: false,
  }),

  computed: {
    serverError () {
      return this.$store.getters.serverError.message
    },

    diseaseErrors () {
      const errors = []
      if (!this.$v.disease.$dirty) return errors
      !this.$v.disease.required && errors.push('Данное поле обязательно')
      return errors
    },

    dateErrors () {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('Данное поле обязательно')
      return errors
    },

    otherDiseaseInformationErrors() {
      const errors = []

      if (!this.isDiseaseOther){
        return errors
      }

      if (!this.$v.otherDiseaseInformation.$dirty) return errors
      !this.$v.otherDiseaseInformation.required && errors.push('Данное поле обязательно')
      !this.$v.otherDiseaseInformation.maxLength && errors.push('Данное поле должно содержать не более 100 символов')
      return errors
    },

    diseaseItems() {
      let tmp = this.$store.getters.diseasesExistingInDirectory;
      tmp.push('Другое')
      return tmp;
    },
  },

  methods: {
    clear() {
      this.$v.$reset()
      this.disease = {}
      this.otherDiseaseInformation = null
      this.isDiseaseOther = false
      this.date = ''
    },

    showDiseaseInfoPage() {
      this.$router.push('/disease/info')
    },

    checkIsOtherSelected() {

      if (this.disease === 'Другое'){
        this.isDiseaseOther = true
      } else {
        this.otherDiseaseInformation = null
        this.isDiseaseOther = false
      }
    },

    isValid() {
      this.$v.$touch()
      return this.diseaseErrors.length === 0
          && this.otherDiseaseInformationErrors.length === 0;
    },

    editDiseaseInfo() {
      if (!this.isValid()){
        return
      }

      let diseaseTmp = null;

      if (this.disease.id) {
        diseaseTmp = this.disease
      }

      let data = {
        disease: diseaseTmp,
        otherDiseaseInformation: this.otherDiseaseInformation,
        dateOfDisease: this.date,
        id: this.diseaseInfoId
      }

      this.$store.dispatch('editDiseaseInformation', data)
          .then(() => this.$router.push('/disease/info'))
          .catch(err => console.log(err))
    }
  },

  beforeMount() {
    this.$store.dispatch('getNotClosedUserDisease');
    this.$store.dispatch('getDiseasesExistingInDirectory');

    if (!this.$store.getters.activeUserDiseaseInfo.disease) {
      this.disease = 'Другое'
      this.isDiseaseOther = true
      this.otherDiseaseInformation = this.$store.getters.activeUserDiseaseInfo.otherDiseaseInformation
    } else {
      this.disease = this.$store.getters.activeUserDiseaseInfo.disease
      this.isDiseaseOther = false
      this.otherDiseaseInformation = null
    }

    this.diseaseInfoId = this.$store.getters.activeUserDiseaseInfo.id
    this.date = this.$store.getters.activeUserDiseaseInfo.dateOfDisease
  },
}
</script>

<style scoped>

</style>