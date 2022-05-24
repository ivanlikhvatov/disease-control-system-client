<template>
  <v-container>

    <v-card
        v-if="diseaseInfo.id"
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
                  label="Медицинская справка"
                  value="pdf"
              ></v-radio>
              <v-radio
                  label="Электронный больничный"
                  value="id"
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
    approveType: 'pdf'
  }),

  computed: {
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

    }
  },

  beforeMount() {
    this.$store.dispatch('getNotClosedUserDisease');
  },
}
</script>

<style scoped>

</style>