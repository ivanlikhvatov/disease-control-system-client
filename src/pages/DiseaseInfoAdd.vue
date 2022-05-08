<template>
  <v-container>
    <v-row justify="space-around mt-7">
      <v-card width="500">
        <v-card-title justify="space-around">
          <p style="font-size: x-large; font-weight: bold; color: #4CAF50">Информация о болезни</p>
        </v-card-title>

        <v-card-text class="justify-center">
          <form @submit.prevent="addDiseaseInfo">

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
                v-model="diseaseOtherDescription"
                :error-messages="diseaseOtherDescriptionErrors"
                color="success"
                required
                :counter="100"
                background-color="green lighten-4"
                filled
                name="input-7-4"
                label="Расскажите чем вы заболели"
                @change="$v.diseaseOtherDescription.$touch()"
                @blur="$v.diseaseOtherDescription.$touch()"
            ></v-textarea>

            <p
                style="color: red"
                v-if="serverError"
            >
              {{serverError}}
            </p>

            <v-btn
                class="mr-4"
                color="success"
                type="submit"
            >
              Сохранить
            </v-btn>

            <v-btn
                class="mr-4"
                color="success"
                @click="clear"
            >
              Очистить
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {validationMixin} from "vuelidate";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  name: "DiseaseAddView",

  mixins: [validationMixin],

  validations: {
    disease: { required },
    date: { required },
    diseaseOtherDescription: { required, maxLength: maxLength(100) }
  },

  data: () => ({
    disease: {},
    diseaseOtherDescription: '',
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

    diseaseOtherDescriptionErrors() {
      const errors = []

      if (!this.isDiseaseOther){
        return errors
      }

      if (!this.$v.diseaseOtherDescription.$dirty) return errors
      !this.$v.diseaseOtherDescription.required && errors.push('Данное поле обязательно')
      !this.$v.diseaseOtherDescription.maxLength && errors.push('Данное поле должно содержать не более 100 символов')
      return errors
    },

    diseaseItems() {
      let tmp = this.$store.getters.diseasesExistingInDirectory;
      tmp.push("Другое")
      return tmp;
    },
  },

  methods: {
    clear() {
      this.$v.$reset()
      this.disease = {}
      this.diseaseOtherDescription = ''
      this.isDiseaseOther = false
      this.date = ''
    },

    checkIsOtherSelected() {

      if (this.disease === "Другое"){
        this.isDiseaseOther = true
      } else {
        this.diseaseOtherDescription = ''
        this.isDiseaseOther = false
      }
    },

    isValid() {
      this.$v.$touch()
      return this.diseaseErrors.length === 0
          && this.diseaseOtherDescriptionErrors.length === 0;
    },

    addDiseaseInfo() {
      if (!this.isValid()){
        return
      }

      alert("send")
    }
  },

  beforeMount() {
    this.$store.dispatch('getDiseasesExistingInDirectory', this.activationCode);
  }
}
</script>

<style scoped>

</style>