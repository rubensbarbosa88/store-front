<template>
  <div>
    <v-tabs
      fixed-tabs
      background-color="indigo"
      color="teal lighten-5"
      slider-size="3"
      class="mb-5"
      dark>
      <v-tab
        :disabled="!isLoaded"
        v-for="(item, index) in tabs"
        :key="index"
        :to="{ name: item.routerName }">
        {{ item.title}}
      </v-tab>
    </v-tabs>
    <div class="px-4 py-8">
      <div
        v-if="!isLoaded"
        class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="blue"
          indeterminate />
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    isLoaded: false,
    tabs: [
      { title: 'Geral', routerName: 'Estoque' },
      { title: 'Entradas', routerName: 'Entrada' },
      { title: 'Saídas', routerName: 'Saida' }
    ]
  }),
  computed: {
    ...mapState(['incomingProducts', 'inventory'])
  },
  async created () {
    if (!this.incomingProducts.length) {
      await this.$store.dispatch('getIncomingProducts')
    }

    if (!this.inventory.length) {
      await this.$store.dispatch('getInventory')
    }

    // this.closeGroups()
    this.isLoaded = true
  }
}
</script>

<style>

</style>
