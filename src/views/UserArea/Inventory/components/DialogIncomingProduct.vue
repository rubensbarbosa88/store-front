<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="600px">
    <v-card>
      <v-toolbar
        color="primary"
        dark>
        <div
          style="width:100%"
          class="d-flex justify-space-between align-center">
          Nova Entrada

          <v-icon @click="closeDialog">
            mdi-close-thick
          </v-icon>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-container class="pt-8">
          <v-form ref="formIncomingProduct">
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  return-object
                  :loading="!isLoaded"
                  :items="products"
                  color="primary"
                  item-text="product"
                  label="Produto"
                  v-model="form.productObj"
                  :rules="[rules.required]"
                  required />
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-text-field
                  type="number"
                  validate-on-blur
                  label="Quantidade"
                  v-model.lazy="form.quantity"
                  :rules="[rules.required, rules.moreThanZero]"
                  required />
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-text-field
                  validate-on-blur
                  label="Motivo"
                  v-model.lazy="form.reason"
                  :rules="[rules.required]"
                  required />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red darken-1"
          @click="closeDialog">
          Cancelar
        </v-btn>
        <v-btn
          text
          color="blue darken-1"
          :loading="sendingRequest"
          @click="saveIncomingProduct">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: Boolean
  },
  data: () => ({
    isLoaded: false,
    sendingRequest: false,
    form: {
      productObj: null,
      quantity: null,
      reason: null,
      date: null
    },
    money: {
      decimal: ',',
      thousands: '.'
    },
    rules: {
      required: v => !!v || 'Campo obrigatório',
      moreThanZero: v => v > 0 || 'A quantidade não pode ser igual ou menor que zero'
    }
  }),
  computed: {
    ...mapState(['products']),
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    closeDialog () {
      this.show = false
      this.$refs.formIncomingProduct.reset()
    },
    datePattern () {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${this.addZero(day)}/${this.addZero(month)}/${year}`
    },
    addZero (num) {
      if (num <= 9) { return `0${num}` } else { return num }
    },
    async saveIncomingProduct () {
      if (!this.$refs.formIncomingProduct.validate()) return
      this.sendingRequest = true

      try {
        const payload = {
          code: this.form.productObj.code,
          product: this.form.productObj.product,
          quantity: this.form.quantity,
          reason: this.form.reason,
          date: this.datePattern()
        }

        await this.$store.dispatch('saveIncomingProduct', payload)
        const getIncomingProducts = this.$store.dispatch('getIncomingProducts')
        const getInventory = this.$store.dispatch('getInventory')

        await getIncomingProducts
        await getInventory
        this.closeDialog()
      } finally {
        this.sendingRequest = false
      }
    }
  },
  async created () {
    await this.$store.dispatch('getProducts')

    this.isLoaded = true
  }
}
</script>
