<template>
  <v-card>
    <v-card-title class="mb-4 justify-space-between">
      <span class="text-uppercase align-center">Produtos</span>
      <v-text-field
        v-model="search"
        class="search-input"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      />
      <v-btn
        class="ma-2"
        rounded
        outlined
        color="primary"
        @click="dialogNewProduct = true">
        Adicionar novo
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :loading="!isLoaded"
      hide-default-footer
      loading-text=""
      no-data-text="Você ainda não cadastrou nenhum produto"
    />

    <dialog-new-product v-model="dialogNewProduct"/>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    DialogNewProduct: () => import('./components/DialogNewProduct')
  },
  data: () => ({
    isLoaded: false,
    dialogNewProduct: false,
    search: '',
    headers: [
      { text: 'Código', value: 'code' },
      { text: 'Descrição', value: 'product' },
      { text: 'Custo', value: 'purchasePrice' },
      { text: 'Preço', value: 'salePrice' }
    ]
  }),
  computed: {
    ...mapState(['products'])
  },
  async created () {
    await this.$store.dispatch('getProducts')
    this.isLoaded = true
  }
}
</script>

<style lang="stylus" scoped>
 .search-input
  max-width 40%
</style>
