<template>
  <v-row>
    <v-col cols="6">
      <v-card
        @click="navigateTo('Produtos')"
        class="d-flex justify-center align-center display-2 font-weight-medium"
        elevation="6"
        height="200">
        Produtos
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card
        @click="a=1"
        class="d-flex justify-center align-center display-2 font-weight-medium"
        height="200"
        elevation="6">
        Entrada
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card
        @click="a=1"
        class="d-flex justify-center align-center display-2 font-weight-medium"
        height="200"
        elevation="6">
        Saída
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card
        @click="a=1"
        class="d-flex justify-center align-center display-2 font-weight-medium"
        height="200"
        elevation="6">
        Histórico
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    navigateTo (routerName) {
      this.$router.push({ name: routerName })
    }
  }
}
</script>

<style>

</style>
