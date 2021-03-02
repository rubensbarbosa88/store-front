<template>
  <div>
    <h1 class="mb-5"> ESTOQUE </h1>

    <v-data-table
      :headers="headers"
      :items="inventory"
      :loading="!isLoaded"
      item-key="product"
      group-by="product"
      class="elevation-1"
      hide-default-footer
      no-data-text="Não há nenhuma produto cadastrado.">
      <template v-slot:[`group.header`] = "{ group, isOpen, toggle, items }" >
        <th colspan="2">
          <div class="d-flex">
            <v-btn
              fab
              x-small
              text
              :disabled="!items[0].inventQtd"
              color="blue lighten-2"
              class="mr-5"
              @click="toggle"
              :ref="group">
              <v-icon>
                {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
              </v-icon>
            </v-btn>
            <div
              class="d-flex justify-space-between align-center"
              style="width:100%">
              <span class="body-2 font-weight-bold">
                {{ group }}
              </span>
              <v-chip
                :color="chipColor(items[0].inventQtd)"
                outlined
                label
                dark>
                {{ items[0].inventQtd }}
              </v-chip>
            </div>
          </div>
        </th>
      </template>
      <template v-slot:item = "{ item }" >
        <tr
          v-for="(row, index) in item.generalData"
          :key="`${row.product}_${index}`">
          <td>
            <div class="d-flex align-center">
              <v-icon
                class="mr-3"
                :color="rowColor(row.type)">
                {{ row.type === 'incoming' ? 'mdi-cart-plus' : 'mdi-truck-delivery' }}
              </v-icon>
              <span class="caption">
                {{ row.date }}
              </span>
            </div>
          </td>
          <td
            :class="`${rowColor(row.type)}--text`"
            class="text-right font-weight-bold caption">
            {{row.type === 'incoming' ? '+':'-'}} {{ row.quantity }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    isLoaded: false,
    headers: [
      {
        text: 'Data',
        align: 'start',
        value: 'date'
      },
      { text: 'Quantidade', value: 'quantity', align: 'end' }
    ],
    desserts: []
  }),
  computed: {
    ...mapState(['incomingProducts', 'inventory']),
    allInventory () {
      const allInventory = []

      return allInventory
    }
  },
  methods: {
    closeGroups () {
      Object.keys(this.$refs).forEach(ref => {
        this.$refs[ref].$el.click()
      })
    },

    chipColor (qntd) {
      if (qntd <= 100) return 'red'
      else if (qntd <= 300) return 'orange'
      else return 'green'
    },

    rowColor (type) {
      return type === 'incoming' ? 'blue' : 'red'
    }
  },
  async created () {
    if (!this.incomingProducts.length) {
      await this.$store.dispatch('getIncomingProducts')
    }

    if (!this.inventory.length) {
      await this.$store.dispatch('getInventory')
    }

    this.closeGroups()
    this.isLoaded = true
  }
}
</script>

<style>

</style>
