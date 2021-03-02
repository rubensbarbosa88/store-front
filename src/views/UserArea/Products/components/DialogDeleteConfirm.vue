<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500">
    <v-card>
      <v-card-title>
        <span class="mr-1">Tem certeza que deseja deletar o</span>
        <span class="blue--text darken-4">
          {{productName}}
        </span> ?
      </v-card-title>
      <v-card-text>Ao clicar em confirmar o produto será excluído.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="closeDialog">
          Cancelar
        </v-btn>
        <v-btn
          color="red"
          text
          :loading="sendingRequest"
          @click="deleteProduct">
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    productSelected: { type: Object, default: () => ({}) }
  },
  data: () => ({
    sendingRequest: false
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    productName () {
      const productName = this.productSelected?.product
      if (productName) {
        return productName.charAt(0).toUpperCase() + productName.slice(1)
      }

      return ''
    }
  },
  methods: {
    closeDialog () {
      this.show = false
    },
    async deleteProduct () {
      this.sendingRequest = true

      await this.$store.dispatch('deleteProduct', this.productSelected._id)
      await this.$store.dispatch('getProducts')

      this.closeDialog()
      this.sendingRequest = false
    }
  }
}
</script>

<style>

</style>
