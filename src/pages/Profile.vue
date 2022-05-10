<template>
  <v-container class="mt-10">
    <v-card
        max-width="375"
        class="mx-auto"
        elevation="4"
    >
      <v-card-title>
        {{username}}
      </v-card-title>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">
              badge
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{user.login}}</v-list-item-title>
            <v-list-item-subtitle>Логин</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">
              mdi-phone
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>+7{{user.phoneNumber}}</v-list-item-title>
            <v-list-item-subtitle>Телефон</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">
              mdi-email
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{user.email}}</v-list-item-title>
            <v-list-item-subtitle>E-mail</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">
              groups
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
<!--              <v-combobox-->
<!--                  v-model="user.roles"-->
<!--                  chips-->
<!--                  label="Your favorite hobbies"-->
<!--                  prepend-icon="mdi-filter-variant"-->
<!--                  solo-->
<!--              >-->
<!--                <template v-slot:selection="{ attrs, item, selected }">-->
<!--                  <v-chip-->
<!--                      v-bind="attrs"-->
<!--                      :input-value="selected"-->
<!--                  >-->
<!--                    <strong>{{ item }}</strong>&nbsp;-->
<!--                  </v-chip>-->
<!--                </template>-->
<!--              </v-combobox>-->
              {{user.roles}}
            </v-list-item-title>
            <v-list-item-subtitle>Роли пользователя</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="primary">
              school
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{user.group.directionProfile.instituteDirection.institute.shortName}}</v-list-item-title>
            <v-list-item-subtitle>Институт</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action></v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{user.group.directionProfile.instituteDirection.shortName}}</v-list-item-title>
            <v-list-item-subtitle>Направление</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action></v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{user.group.name}}</v-list-item-title>
            <v-list-item-subtitle>Группа</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ProfileView",

  computed: {
    user() {
      return this.$store.getters.user
    },

    username() {

      let patronymic = ''

      if (this.$store.getters.user.patronymic) {
        patronymic = this.$store.getters.user.patronymic
      }

      return this.$store.getters.user.lastname + ' ' + this.$store.getters.user.firstname + ' ' + patronymic
    }
  }
}
</script>

<style scoped>

</style>