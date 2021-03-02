import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginPage.vue')
  },
  {
    path: '/',
    name: 'UserArea',
    component: () => import('@/views/UserArea/UserArea.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/UserArea/Home.vue')
      },
      {
        path: 'produtos',
        name: 'Produtos',
        component: () => import('@/views/UserArea/Products/Products.vue')
      },
      {
        path: 'estoque',
        name: 'Estoque',
        component: () => import('@/views/UserArea/Inventory/Inventory.vue'),
        children: [
          {
            path: '',
            name: 'Estoque',
            component: () => import('@/views/UserArea/Inventory/InventoryProducts.vue')
          },
          {
            path: 'entradas',
            name: 'Entrada',
            component: () => import('@/views/UserArea/Inventory/IncomingProducts.vue')
          },
          {
            path: 'saidas',
            name: 'Saida',
            component: () => import('@/views/UserArea/Inventory/OutputProducts.vue')
          }
        ]
      }
    ]
  }
  // {
  //   path: '/Produtos',
  //   name: 'Home',
  //   component: () => import('@/views/Home/Home.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
