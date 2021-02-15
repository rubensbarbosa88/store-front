<template>
  <div>
    <lateral-menu />

    <v-container class="purchase-store" fluid>
      <router-view />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    LateralMenu: () => import('./components/LateralMenu')
  },
  data: () => ({
    drawer: false
  })
}
</script>

<style lang="stylus" scoped>
.purchase-store
  padding 50px 50px 0 100px
  @media (min-width: 1400px)
    max-width 80%
</style>
