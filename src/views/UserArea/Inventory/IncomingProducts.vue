<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-5">
    <h1> ENTRADAS </h1>
    <v-btn
      class="ma-2"
      rounded
      outlined
      color="primary"
      @click="dialogIncomingProduct = true">
      nova entrada
      <v-icon class="ml-2">
        mdi-plus
      </v-icon>
    </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="incomingProducts"
      :loading="!isLoaded"
      item-key="product"
      group-by="product"
      class="elevation-1"
      hide-default-footer
      no-data-text="Não há nenhuma entrada registrada.">
      <template v-slot:[`group.header`] = "{ group, isOpen, toggle }" >
        <th colspan="3">
          <v-btn
            fab
            text
            x-small
            color="blue lighten-2"
            class="mr-5"
            @click="toggle"
            :ref="group">
            <v-icon>
              {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
            </v-icon>
          </v-btn>
        <span class="body-2 font-weight-bold">
          {{group}}
        </span>
        </th>
      </template>
    </v-data-table>

    <dialog-incoming-product v-model="dialogIncomingProduct" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    DialogIncomingProduct: () => import('./components/DialogIncomingProduct')
  },
  data () {
    return {
      dialogIncomingProduct: false,
      headers: [
        {
          text: 'Data',
          align: 'start',
          value: 'date'
        },
        { text: 'Descrição', value: 'product' },
        { text: 'Quantidade', value: 'quantity', align: 'center' },
        { text: 'Motivo', value: 'reason', align: 'right' }
      ],
      desserts: []
    }
  },
  computed: {
    ...mapState(['incomingProducts'])
  },
  methods: {
    closeGroups () {
      Object.keys(this.$refs).forEach(ref => {
        this.$refs[ref].$el.click()
      })
    }
  },
  async created () {
    if (!this.incomingProducts.length) {
      await this.$store.dispatch('getIncomingProducts')
    }

    this.closeGroups()
    this.isLoaded = true
  }
}
</script>

<style>

</style>
