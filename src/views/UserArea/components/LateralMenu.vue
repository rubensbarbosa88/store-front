<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    fixed>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            Rubens Barbosa
          </v-list-item-title>
          <v-list-item-subtitle>Gerente</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense>
      <v-list-item
        v-for="(item, index) in menuItens"
        :key="index"
        link>
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{item.title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    menuItens: [
      { icon: 'mdi-dropbox', title: 'Produtos' },
      { icon: 'mdi-cart-plus', title: 'Entrada' },
      { icon: 'mdi-truck-delivery', title: 'Saída' },
      { icon: 'mdi-calendar-clock', title: 'Histórico' }
    ]
  })
}
</script>
