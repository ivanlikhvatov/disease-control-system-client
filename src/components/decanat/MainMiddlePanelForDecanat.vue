<template>
  <v-container class="mt-lg-16">

    <p style="font-size: x-large; font-weight: bold; color: slategrey; text-align: center">Оперативные данные</p>

    <v-item-group>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-item>
            <v-card
                class="mx-auto"
                color="red darken-1"
                dark
                max-width="400"
            >
              <v-card-title>
                <v-icon
                    large
                    left
                >
                  sick
                </v-icon>
                <span class="text-h6">На данный момент болеет</span>
              </v-card-title>

              <v-card-text class="text-h5 red">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h2 font-weight-bold mb-1">
                      {{user.additionalInfo.decanatAdditionalInfo.countOfSickNow}}
                    </v-list-item-title>

                    <div class="mb-4 text-h6">
                      Болеет во всем институте
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>

              <v-card-actions class="red">
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    large
                    @click="showActiveSicksPage"
                >
                  <v-icon>
                    arrow_forward
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-item>
            <v-card
                class="mx-auto"
                color="primary darken-1"
                dark
                max-width="400"
            >
              <v-card-title>
                <v-icon
                    large
                    left
                >
                  today
                </v-icon>
                <span class="text-h6">Статистика за сегодня</span>
              </v-card-title>

              <v-card-text class="text-h5 primary">
                <v-list-item three-line>
                  <v-list-item-content>

                    <v-list-item-title class="text-h2 font-weight-bold mb-1">
                      {{user.additionalInfo.decanatAdditionalInfo.countOfSickToday}} / {{user.additionalInfo.decanatAdditionalInfo.countOfRecoverToday}}
                    </v-list-item-title>
                    <div class="mb-4 text-h6">
                      Заболело / Выздоровело
                    </div>

                  </v-list-item-content>
                </v-list-item>
              </v-card-text>

              <v-card-actions class="primary">
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    large
                    @click="showActiveSicksPage"
                >
                  <v-icon>
                    arrow_forward
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>

        <v-col
            cols="12"
            md="4"
        >
          <v-item>
            <v-card
                class="mx-auto"
                color="orange darken-1"
                dark
                max-width="400"
            >
              <v-card-title>
                <v-icon
                    large
                    left
                >
                  warning_amber
                </v-icon>
                <span class="text-h6">Наиболее тяжелая ситуация</span>
              </v-card-title>

              <v-card-text class="text-h5 orange">
                <v-list-item three-line>
                  <v-list-item-content>

                    <v-list-item-title class="text-h2 font-weight-bold mb-1">
                      {{mostCountOfSickDepartment.countOfSick}}
                    </v-list-item-title>

                    <div class="mb-4 text-h6">
                      Болеет на кафедре {{mostCountOfSickDepartment.name}}
                    </div>

                  </v-list-item-content>
                </v-list-item>
              </v-card-text>

              <v-card-actions class="orange">
                <v-spacer></v-spacer>
                <v-btn
                    icon
                    large
                    @click="showChooseGraphicsPage"
                >
                  <v-icon>
                    arrow_forward
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

  </v-container>
</template>

<script>
export default {
  name: "MainCardGroupForDecanat",

  computed: {
    user() {
      return this.$store.getters.user
    },

    mostCountOfSickDepartment() {
      var diseasesByDepartments = this.$store.getters.user.additionalInfo.decanatAdditionalInfo.universityPartCountOfSicks

      if (diseasesByDepartments.length === 0) {
        return null
      }

      var mostCountOfSickDepartment = diseasesByDepartments[0];

      for (var i = 0; i < diseasesByDepartments.length; i++) {

        if (diseasesByDepartments[i].countOfSick > mostCountOfSickDepartment.countOfSick) {
          mostCountOfSickDepartment = diseasesByDepartments[i]
        }
      }

      return mostCountOfSickDepartment
    }
  },

  methods: {
    showActiveSicksPage() {
      this.$router.push({ path: '/diseases/table/choose'})
    },

    showChooseGraphicsPage() {
      this.$router.push({ path: '/diseases/graphics/choose'})
    }
  }
}
</script>

<style scoped>

</style>