<template>
  <v-container>
    <div
        v-if="!serverError.message && !serverResponse.status && !diseaseInfo.id"
        class="text-center mt-7"
    >
      <v-progress-circular
          :size="90"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>

    <v-card
        v-else-if="diseaseInfo.id"
        class="mx-auto mt-5"
        max-width="500"
        elevation="4"
    >

      <v-card-title>
        <p style="font-size: x-large; font-weight: bold; color: #4CAF50">Информация о болезни</p>
      </v-card-title>

      <v-card-subtitle>
        {{fullUsername}}
      </v-card-subtitle>

      <div v-if="diseaseInfo.disease">
        <v-card-title>
          Заболевание
        </v-card-title>

        <v-card-subtitle class="text--primary">
          <div>{{diseaseInfo.disease.name}}</div>
        </v-card-subtitle>
      </div>

      <div v-else>
        <v-card-title>
          Заболевание
        </v-card-title>

        <v-card-subtitle class="text--primary">
          <div>{{diseaseInfo.otherDiseaseInformation}}</div>
        </v-card-subtitle>
      </div>

      <v-card-title>
        Дата начала болезни
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.dateOfDisease}}</div>
      </v-card-subtitle>

      <v-card-title>
        Статус заболевания
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.status.description}}</div>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
            outlined
            rounded
            color="success"
            @click.stop="isChooseApproveDiseaseMenu = true"
        >
          Я выздоровел
        </v-btn>

        <v-btn
            outlined
            rounded
            color="success"
            @click="showEditDiseaseInfo"
        >
          Редактировать
        </v-btn>
      </v-card-actions>

      <v-dialog
          v-model="isChooseApproveDiseaseMenu"
          max-width="550"
      >
        <v-card>
          <v-card-title>
            Выберите способ подтверждения больничного
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-radio-group
                v-model="approveType"
                column
            >
              <v-radio
                  label="Скан медицинской справки"
                  value="scannedCertificate"
              ></v-radio>
              <v-radio
                  label="Электронный больничный"
                  value="electronicSickId"
              ></v-radio>
            </v-radio-group>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                outlined
                rounded
                color="success"
                @click="openApproveDiseasePage"
            >
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    <v-alert
        v-else
        outlined
        color="success"
        text
    >
      <p style="font-size: xx-large">Уважаемый {{username}},</p>
      <p style="font-size: x-large">У нас нет информации о вашем заболевании.</p>

      <v-btn
          outlined
          rounded
          color="success"
          @click="showAddDiseaseInfoPage"
      >
        Добавить информацию
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: "DiseaseInfoView",

  data: () => ({
    isChooseApproveDiseaseMenu: false,
    approveType: 'scannedCertificate'
  }),

  computed: {
    serverResponse () {
      return this.$store.getters.serverResponse
    },

    serverError () {
      return this.$store.getters.serverError
    },

    diseaseInfo() {
      return this.$store.getters.activeUserDiseaseInfo
    },

    username() {
      let patronymic = ''

      if (this.$store.getters.user.patronymic) {
        patronymic = this.$store.getters.user.patronymic
      }

      return this.$store.getters.user.firstname + ' ' + patronymic
    },

    fullUsername() {
      let patronymic = ''

      if (this.$store.getters.user.patronymic) {
        patronymic = this.$store.getters.user.patronymic
      }

      return this.$store.getters.user.lastname + ' ' + this.$store.getters.user.firstname + ' ' + patronymic
    }
  },

  methods: {
    showAddDiseaseInfoPage() {
      this.$router.push('/disease/info/add')
    },

    showEditDiseaseInfo() {
      this.$router.push('/disease/info/edit')
    },

    openApproveDiseasePage() {
      this.$router.push({ path: '/disease/approve', query: { approveType: this.approveType }})
    }
  },

  beforeMount() {
    this.$store.dispatch('getNotClosedUserDisease');
  },
}
</script>

<style scoped>

</style>