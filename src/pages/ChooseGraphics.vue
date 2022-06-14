<template>
  <v-container>
    <v-card
        max-width="500"
        class="mx-auto"
        elevation="4"
    >

      <v-toolbar
          color="primary"
          dark
      >Вам доступны следующие статистики</v-toolbar>

      <v-list
          nav
          dense
      >
        <v-list-item-group
            active-class="primary--text text--accent-4"
        >
          <v-list-item
              v-if="isDecanat"
              @click.stop="isChooseDatesInstituteGraphicMenu = true"
          >
            По институту
          </v-list-item>

          <v-list-item
              v-if="isDecanat || isRectorat"
              @click.stop="isChooseDepartmentMenu = true"
          >
            По кафедрам
          </v-list-item>

          <v-list-item
              v-if="isDecanat || isRectorat || isCurator || isTeacher"
              @click.stop="isChooseGroupMenu = true"
          >
            По группам
          </v-list-item>

        </v-list-item-group>
      </v-list>

      <v-dialog
          v-model="isChooseDatesInstituteGraphicMenu"
          max-width="550"
      >
        <v-card>
          <v-card-title>
            Выберите группу и даты
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text class="mt-5">
            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="startDateErrors"
                    required
                    color="info"
                    v-model="startDate"
                    label="Начало"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.startDate.$touch()"
                    @blur="$v.startDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="startDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>

            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="endDateErrors"
                    required
                    color="info"
                    v-model="endDate"
                    label="Конец"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.endDate.$touch()"
                    @blur="$v.endDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="endDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>


          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                outlined
                rounded
                color="success"
                @click="showInstituteDecanatGraphics"
            >
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          v-model="isChooseDepartmentMenu"
          max-width="550"
      >
        <v-card>
          <v-card-title>
            Выберите группу и даты
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text class="mt-5">

            <v-autocomplete
                v-model="selectedDepartment"
                :items="user.additionalInfo.universityInfo.departments"
                item-text="shortName"
                dense
                label="Выберите название кафедры"
                required
                return-object
                :error-messages="selectedDepartmentErrors"
                @change="$v.selectedDepartment.$touch()"
                @blur="$v.selectedDepartment.$touch()"
            ></v-autocomplete>

            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="startDateErrors"
                    required
                    color="info"
                    v-model="startDate"
                    label="Начало"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.startDate.$touch()"
                    @blur="$v.startDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="startDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>

            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="endDateErrors"
                    required
                    color="info"
                    v-model="endDate"
                    label="Конец"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.endDate.$touch()"
                    @blur="$v.endDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="endDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>


          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                outlined
                rounded
                color="success"
                @click="showDepartmentGraphics"
            >
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
          v-model="isChooseGroupMenu"
          max-width="550"
      >
        <v-card>
          <v-card-title>
            Выберите группу и даты
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text class="mt-5">

            <v-autocomplete
                v-model="selectedGroup"
                :items="user.additionalInfo.universityInfo.groups"
                item-text="name"
                dense
                label="Выберите название группы"
                required
                return-object
                :error-messages="selectedGroupErrors"
                @change="$v.selectedGroup.$touch()"
                @blur="$v.selectedGroup.$touch()"
            ></v-autocomplete>

            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="startDateErrors"
                    required
                    color="info"
                    v-model="startDate"
                    label="Начало"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.startDate.$touch()"
                    @blur="$v.startDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="startDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>

            <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    :error-messages="endDateErrors"
                    required
                    color="info"
                    v-model="endDate"
                    label="Конец"
                    append-icon="event"
                    outlined
                    readonly
                    @change="$v.endDate.$touch()"
                    @blur="$v.endDate.$touch()"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  ref="picker"
                  v-model="endDate"
                  color="info"
                  :max="dateNow"
              ></v-date-picker>
            </v-menu>


          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                outlined
                rounded
                color="success"
                @click="showGroupGraphics"
            >
              Далее
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
  </v-container>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import moment from "moment";

export default {
  name: "ChooseStatisticView",

  mixins: [validationMixin],
  validations: {
    selectedGroup: { required },
    selectedDepartment: {required},

    startDate: { required },
    endDate: { required }
  },

  data: () => ({

    selectedGroup: {},
    selectedDepartment: {},
    startDate: '',
    endDate: '',

    isChooseGroupMenu: false,
    isChooseDepartmentMenu: false,
    isChooseDatesInstituteGraphicMenu: false,
  }),

  computed : {
    isAdmin: function () { return this.$store.getters.isAdmin},
    isDecanat: function () { return this.$store.getters.isDecanat},
    isCurator: function () { return this.$store.getters.isCurator},
    isRectorat: function () { return this.$store.getters.isRectorat},
    isCuratorSupervising: function () { return this.$store.getters.isCuratorSupervising},
    isTeacher: function () { return this.$store.getters.isTeacher},
    user: function () { return this.$store.getters.user},

    dateNow() {
     return moment().format('YYYY-MM-DD');
    },

    selectedGroupErrors() {
      const errors = []

      if (!this.$v.selectedGroup.$dirty) return errors
      !this.$v.selectedGroup.required && errors.push('Данное поле обязательно')
      return errors
    },

    selectedDepartmentErrors() {
      const errors = []

      if (!this.$v.selectedDepartment.$dirty) return errors
      !this.$v.selectedDepartment.required && errors.push('Данное поле обязательно')
      return errors
    },

    startDateErrors() {
      const errors = []
      if (!this.$v.startDate.$dirty) return errors
      !this.$v.startDate.required && errors.push('Данное поле обязательно')
      return errors
    },

    endDateErrors() {
      const errors = []

      if (!this.$v.endDate.$dirty) return errors

      if (this.endDate < this.startDate) {
        errors.push('Дата окончания стастики должна быть меньше или равна дате начала')
      }

      !this.$v.endDate.required && errors.push('Данное поле обязательно')

      return errors
    },


  },

  methods: {

    showInstituteDecanatGraphics() {
      let data = {
        institute: this.user.institute,
        startDate: this.startDate,
        endDate: this.endDate,
        graphicType: 'byInstituteByDecanat'
      }

      this.$store.dispatch('getInstituteGraphicData', data)
          .then(() => this.$router.push({ path: '/disease/graphics', query: { graphicInfo: data}}))
          .catch(err => console.log(err))
    },

    showDepartmentGraphics() {
      this.$v.$touch()

      if (this.selectedDepartmentErrors.length !== 0 || this.startDateErrors.length !== 0 || this.endDateErrors.length !== 0) {
        return
      }

      let data = {
        department: this.selectedDepartment,
        startDate: this.startDate,
        endDate: this.endDate,
        graphicType: 'byDepartments'
      }

      this.$store.dispatch('getDepartmentGraphicData', data)
          .then(() => this.$router.push({ path: '/disease/graphics', query: { graphicInfo: data}}))
          .catch(err => console.log(err))
    },

    showGroupGraphics() {
      this.$v.$touch()

      if (this.selectedGroupErrors.length !== 0 || this.startDateErrors.length !== 0 || this.endDateErrors.length !== 0) {
        return
      }

      let data = {
        group: this.selectedGroup,
        startDate: this.startDate,
        endDate: this.endDate,
        graphicType: 'byGroups'
      }

      this.$store.dispatch('getGroupGraphicData', data)
          .then(() => this.$router.push({ path: '/disease/graphics', query: { graphicInfo: data}}))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>