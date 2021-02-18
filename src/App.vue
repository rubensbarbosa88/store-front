<template>
  <v-app>
    <v-main>
      <router-view />

      <v-snackbar
        @input="turnOffSnackbar"
        :value="snackbar.open"
        :color="snackbar.error ? 'red' : 'light-green'"
        :timeout="2000"
        top>
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    turnOffSnackbar (value) {
      this.$store.commit('SET_SNACKBAR', { ...this.snackbar, open: false })
    }
  }
}
</script>
