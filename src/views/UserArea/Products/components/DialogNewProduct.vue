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
          Adicionar novo produto

          <v-icon @click="closeDialog">
            mdi-close-thick
          </v-icon>
        </div>
      </v-toolbar>
      <v-card-text>
        <v-container class="pt-8">
          <v-form ref="formNewProduct">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  validate-on-blur
                  label="Produto"
                  :rules="[rules.required]"
                  v-model="form.product"
                  required />
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-text-field
                  validate-on-blur
                  label="Custo de compra"
                  prefix="R$"
                  v-model.lazy="form.purchasePrice"
                  :rules="[rules.required, rules.moreThanZero]"
                  v-money="money"
                  required />
              </v-col>
              <v-col
                cols="12"
                sm="6">
                <v-text-field
                  validate-on-blur
                  label="Preço de venda"
                  prefix="R$"
                  v-model.lazy="form.salePrice"
                  :rules="[rules.required, rules.moreThanZero]"
                  v-money="money"
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
          @click="createProduct">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VMoney } from 'v-money'
import { moneyToNumber } from '@/helpers'

export default {
  directives: { money: VMoney },
  props: {
    value: Boolean
  },
  data: () => ({
    sendingRequest: false,
    form: {
      product: null,
      purchasePrice: 0.0,
      salePrice: 0.0
    },
    money: {
      decimal: ',',
      thousands: '.'
    },
    rules: {
      required: v => !!v || 'Campo obrigatório',
      moreThanZero: v => moneyToNumber(v) > 0 || 'O valor não pode ser igual ou menor que zero'
    }
  }),
  computed: {
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
      this.$refs.formNewProduct.reset()
    },
    async createProduct () {
      if (!this.$refs.formNewProduct.validate()) return
      this.sendingRequest = true

      try {
        const payload = {
          product: this.form.product,
          purchasePrice: moneyToNumber(this.form.purchasePrice),
          salePrice: moneyToNumber(this.form.salePrice)
        }

        await this.$store.dispatch('createProduct', payload)
        await this.$store.dispatch('getProducts')
        this.closeDialog()
      } finally {
        this.sendingRequest = false
      }
    }
  }
}
</script>
