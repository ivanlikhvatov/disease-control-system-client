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
              color="info"
              type="submit"
          >
            Сохранить
          </v-btn>

          <v-btn
              class="mr-4"
              color="info"
              @click="clear"
          >
            Очистить
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
  props: ['approveType'],

  mixins: [validationMixin],

  validations: {
    electronicSickId: { required, maxLength: maxLength(50) },
    scannedCertificate: { required }
  },

  data: () => ({
    electronicSickId: '',
    scannedCertificate: null,
  }),

  computed: {
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

    isValid() {
      this.$v.$touch()
      return this.electronicSickIdErrors.length === 0 && this.scannedCertificateErrors.length === 0;
    },

    approveDisease() {

      if (!this.isValid()){
        return
      }

      let data = {
        approveType: this.approveType,
        electronicSickId: this.electronicSickId,
        scannedCertificate: this.scannedCertificate
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