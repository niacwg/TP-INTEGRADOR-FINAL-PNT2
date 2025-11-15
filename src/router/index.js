import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/productos-generales'
  },
  {
    path: '/productos-generales',
    name: 'productos-generales',
    component: function () {
      return import(/* webpackChunkName: "productos-generales" */ '../views/ProductosGenerales.vue')
    }
  },
  {
    path: '/producto/:id',
    name: 'producto-individual',
    component: function () {
      return import(/* webpackChunkName: "producto-individual" */ '../views/ProductoIndividual.vue')
    }
  },
  {
    path: '/carro-de-compras',
    name: 'carro-de-compras',
    component: function () {
      return import(/* webpackChunkName: "carro-de-compras" */ '../views/CarroDeCompras.vue')
    }
  },

  {
    path: '/pagos',
    name: 'pagos',
    component: function () {
      return import(/* webpackChunkName: "pagos" */ '../views/Pagos.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(), // Cambiado de createWebHashHistory() a createWebHistory()
  routes
})

export default router
