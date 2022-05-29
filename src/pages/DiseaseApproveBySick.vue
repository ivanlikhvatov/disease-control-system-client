<template>
  <v-container>
    <v-card
        max-width="500"
        class="mx-auto mt-5"
        elevation="4"
    >
      <v-card-title justify="space-around">
        <p style="font-size: x-large; font-weight: bold; color: slategrey">Подтвердите заболевание</p>
      </v-card-title>

      <v-card-text class="justify-center">
        <form @submit.prevent="approveDisease">
          <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                  :error-messages="dateOfRecoveryErrors"
                  required
                  color="info"
                  v-model="dateOfRecovery"
                  label="Когда вы выздоровели"
                  append-icon="event"
                  outlined
                  readonly
                  @change="$v.dateOfRecovery.$touch()"
                  @blur="$v.dateOfRecovery.$touch()"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                ref="picker"
                v-model="dateOfRecovery"
                color="info"
                :max="new Date().toISOString().substr(0, 10)"
                :min="dateOfDisease"
            ></v-date-picker>
          </v-menu>

          <v-text-field
              v-if="approveType === 'electronicSickId'"
              name="electronicSickIdInput"
              label="Номер электронного больничного"
              v-model="electronicSickId"
              :error-messages="electronicSickIdErrors"
              counter="50"
              required
              @input="$v.electronicSickId.$touch()"
              @blur="$v.electronicSickId.$touch()"
          ></v-text-field>

          <v-file-input
              id="scannedCertificatePdfFile"
              v-if="approveType === 'scannedCertificate'"
              :error-messages="scannedCertificateErrors"
              v-model="scannedCertificate"
              accept="application/pdf"
              show-size
              required
              label="Приложите скан справки в формате pdf"
              @input="$v.scannedCertificate.$touch()"
              @blur="$v.scannedCertificate.$touch()"
          ></v-file-input>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="info"
              type="submit"
          >
            Сохранить
          </v-btn>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="info"
              @click="clear"
          >
            Очистить
          </v-btn>

          <v-btn
              class="mr-4"
              outlined
              rounded
              color="info"
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
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";

export default {
  name: "DiseaseApproveBySickView",
  props: ['approveType', 'diseaseId', 'dateOfDisease'],

  mixins: [validationMixin],

  validations: {
    electronicSickId: { required, maxLength: maxLength(50) },
    scannedCertificate: { required },
    dateOfRecovery: { required }
  },

  data: () => ({
    electronicSickId: '',
    scannedCertificate: null,
    base64ScannedCertificate: null,
    dateOfRecovery: '',

    dateMenu: false
  }),

  computed: {
    dateOfRecoveryErrors () {
      const errors = []
      if (!this.$v.dateOfRecovery.$dirty) return errors
      !this.$v.dateOfRecovery.required && errors.push('Данное поле обязательно')
      return errors
    },

    electronicSickIdErrors () {
      const errors = []

      if (this.approveType !== 'electronicSickId'){
        return errors
      }

      if (!this.$v.electronicSickId.$dirty) return errors
      !this.$v.electronicSickId.required && errors.push('Данное поле обязательно')
      return errors
    },

    scannedCertificateErrors () {
      const errors = []

      if (this.approveType !== 'scannedCertificate'){
        return errors
      }

      if (!this.$v.scannedCertificate.$dirty) return errors
      !this.$v.scannedCertificate.required && errors.push('Данное поле обязательно')

      if (this.scannedCertificate !== null && this.scannedCertificate.size > 7000000) {
        errors.push('Максимальный размер файла 7MB')
      }

      return errors
    },
  },

  methods: {
    clear () {
      this.$v.$reset()
      this.electronicSickId = ''
      this.scannedCertificate = null
    },

    showDiseaseInfoPage() {
      this.$router.push('/disease/info')
    },

    isValid() {
      this.$v.$touch()
      return this.electronicSickIdErrors.length === 0
          && this.scannedCertificateErrors.length === 0
          && this.dateOfRecoveryErrors.length === 0;
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },

    approveDisease() {
      if (!this.isValid()){
        return
      }

      if (this.approveType === 'scannedCertificate') {
        this.sendRequestWithFile()
      }

      if (this.approveType === 'electronicSickId') {
        this.sendRequestWithId()
      }
    },

    sendRequestWithFile() {
      let file = document.getElementById("scannedCertificatePdfFile").files[0];

      this.getBase64(file)
          .then(base64File => {

            let data = {
              id: this.diseaseId,
              approveType: this.approveType,
              dateOfRecovery: this.dateOfRecovery,
              scannedCertificate: base64File,
            }

            this.$store.dispatch('approveDiseaseBySick', data)
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err))
          })
    },

    sendRequestWithId() {
      let data = {
        id: this.diseaseId,
        approveType: this.approveType,
        dateOfRecovery: this.dateOfRecovery,
        electronicSickId: this.electronicSickId,
      }

      this.$store.dispatch('approveDiseaseBySick', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>