<template>
  <v-container>
    <v-card
        class="mx-auto mt-5"
        max-width="500"
        elevation="4"
    >

      <v-toolbar
          color="primary"
          dark
      >{{diseaseInfo.user.lastname}} {{diseaseInfo.user.firstname}} {{diseaseInfo.user.patronymic}}</v-toolbar>

      <v-card-title>
        Номер студенческого
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.user.login}}</div>
      </v-card-subtitle>

      <v-card-title>
        Номер телефона
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>+7{{diseaseInfo.user.phoneNumber}}</div>
      </v-card-subtitle>

      <v-card-title>
        E-mail
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.user.email}}</div>
      </v-card-subtitle>

      <v-card-title>
        Группа обученния
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.user.group.name}}</div>
      </v-card-subtitle>

      <v-card-title>
        Кафедра
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.user.group.directionProfile.instituteDirection.department.shortName}}</div>
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
        Дата выздоровления
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.dateOfRecovery}}</div>
      </v-card-subtitle>

      <v-card-title>
        Статус заболевания
      </v-card-title>

      <v-card-subtitle class="text--primary">
        <div>{{diseaseInfo.status.description}}</div>
      </v-card-subtitle>

      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">

            <v-btn
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                class="ma-2 white--text"
                @click="approveDisease"
            >
              <v-icon>
                domain_verification
              </v-icon>
            </v-btn>
          </template>
          <span>Подтвердить</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">

            <v-btn
                color="warning"
                dark
                v-bind="attrs"
                v-on="on"
                class="ma-2 white--text"
                @click.stop="isRefundDiseaseToUserMenu = true"
            >
              <v-icon>
                keyboard_return
              </v-icon>
            </v-btn>
          </template>
          <span>Вернуть в активные</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">

            <v-btn
                color="error"
                dark
                v-bind="attrs"
                v-on="on"
                class="ma-2 white--text"
                @click.stop="isRejectDiseaseMenu = true"
            >
              <v-icon>
                free_cancellation
              </v-icon>
            </v-btn>
          </template>
          <span>Удалить</span>
        </v-tooltip>


        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">

            <v-btn
                v-bind="attrs"
                v-on="on"
                :download=diseaseInfo.user.login
                :href=diseaseInfo.scannedCertificateInBase64
                :loading="loading5"
                :disabled="loading5"
                color="blue-grey"
                class="ma-2 white--text"
                @click="loader = 'loading5'"
            >
              <v-icon
                  right
                  dark
              >
                cloud_download
              </v-icon>
            </v-btn>
          </template>
          <span>Скачать справку</span>
        </v-tooltip>

        <v-dialog
            v-model="isRefundDiseaseToUserMenu"
            max-width="550"
        >
          <form
              @submit.prevent="returnToActive"
          >
            <v-card>
              <v-card-title>
                Укажите причину
              </v-card-title>
              <v-card-text>

                <v-textarea
                    v-model="refundCause"
                    :error-messages="refundCauseErrors"
                    color="primary"
                    required
                    :counter="350"
                    filled
                    name="input-7-4"
                    label="Почему заболевание возвращается"
                    @change="$v.refundCause.$touch()"
                    @blur="$v.refundCause.$touch()"
                ></v-textarea>


              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="primary"
                    text
                    type="submit"
                >
                  Отправить
                </v-btn>

                <v-btn
                    color="primary"
                    text
                    @click="isRefundDiseaseToUserMenu = false"
                >
                  Закрыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>

        </v-dialog>

        <v-dialog
            v-model="isRejectDiseaseMenu"
            max-width="550"
        >
          <form
              @submit.prevent="rejectDisease"
          >
            <v-card>
              <v-card-title>
                Укажите причину отмены
              </v-card-title>
              <v-card-text>

                <v-textarea
                    v-model="rejectCause"
                    :error-messages="rejectCauseErrors"
                    color="primary"
                    required
                    :counter="350"
                    filled
                    name="input-7-4"
                    label="Почему заболевание удаляется"
                    @change="$v.rejectCause.$touch()"
                    @blur="$v.rejectCause.$touch()"
                ></v-textarea>


              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="error"
                    text
                    type="submit"
                >
                  Удалить
                </v-btn>

                <v-btn
                    color="primary"
                    text
                    @click="isRejectDiseaseMenu = false"
                >
                  Закрыть
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>

        </v-dialog>


        <v-spacer></v-spacer>

        <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="showDiseaseProcessedList"
        >
          Назад
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import {validationMixin} from "vuelidate";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  props: ['diseaseInfo'],
  name: "DiseaseApproveByDecanatView",

  mixins: [validationMixin],
  validations: {
    refundCause: { required, maxLength: maxLength(350) },
    rejectCause: { required, maxLength: maxLength(350) },
  },

  data: () => ({
    refundCause: '',
    rejectCause: '',
    isRefundDiseaseToUserMenu: false,
    isRejectDiseaseMenu: false,
    loader: null,
    loading5: false,
  }),

  methods: {

    //todo попробовать сделать так, чтоб возвращались в главное меню
    showDiseaseProcessedList() {
      this.$router.push({ path: '/diseases/table/choose'})
    },

    approveDisease() {
      this.$store.dispatch('approveDiseaseByDecanat', this.diseaseInfo.id)
          .then(() => this.$router.push('/diseases/table/choose'))
          .catch(err => console.log(err))
    },

    rejectDisease() {
      this.$v.$touch()

      if (this.rejectCauseErrors.length !== 0){
        return
      }

      let data = {
        diseaseId: this.diseaseInfo.id,
        rejectCause: this.rejectCause
      }

      this.$store.dispatch('rejectDisease', data)
          .then(() => this.$router.push('/diseases/table/choose'))
          .catch(err => console.log(err))
    },

    returnToActive() {
      this.$v.$touch()

      if (this.refundCauseErrors.length !== 0){
        return
      }

      let data = {
        diseaseId: this.diseaseInfo.id,
        refundCause: this.refundCause
      }

      this.$store.dispatch('refundDiseaseToUser', data)
          .then(() => this.$router.push('/diseases/table/choose'))
          .catch(err => console.log(err))
    },

  },

  computed: {
    refundCauseErrors() {
      const errors = []

      if (!this.$v.refundCause.$dirty) return errors
      !this.$v.refundCause.required && errors.push('Данное поле обязательно')
      !this.$v.refundCause.maxLength && errors.push('Данное поле должно содержать не более 350 символов')
      return errors
    },

    rejectCauseErrors() {
      const errors = []

      if (!this.$v.rejectCause.$dirty) return errors
      !this.$v.rejectCause.required && errors.push('Данное поле обязательно')
      !this.$v.rejectCause.maxLength && errors.push('Данное поле должно содержать не более 350 символов')
      return errors
    },
  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>