<template>
  <v-container
    fluid
    class="grey lighten-2 ks-login d-flex flex-column align-center justify-center">
    <v-card
      width="100%"
      max-width="560">

      <v-card-text class="pa-10 px-12">
        <div :class="{'px-8': $vuetify.breakpoint.width > 500}">
          <h1 class="mb-12"> Club KS - Login </h1>
          <v-form ref="loginForm">
            <v-text-field
              label="Usuário"
              outlined
            />
            <v-text-field
              class="mt-4"
              label="Senha"
              :type="passwordFieldType"
              outlined>

              <template v-slot:append>
                <v-icon @click="isPassword = !isPassword">
                  {{ eyeIcon }}
                </v-icon>
              </template>
            </v-text-field>

            <v-checkbox class="mt-0">
              <template v-slot:label>
                <span class="body-2">Lembrar</span>
              </template>
            </v-checkbox>

            <v-btn
              height="45"
              min-width="150"
              color="grey darken-4"
              class="rounded mt-12"
              :to="{name: 'Home'}">
              <span class="white--text">Login</span>
            </v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isPassword: true
  }),
  computed: {
    passwordFieldType () {
      return this.isPassword ? 'password' : 'text'
    },
    eyeIcon () {
      return this.isPassword ? 'mdi-eye' : 'mdi-eye-off'
    }
  },
  methods: {
  }

}
</script>

<style lang="stylus">
  .ks-login
    height 100vh
    border: 1px solid red

</style>
