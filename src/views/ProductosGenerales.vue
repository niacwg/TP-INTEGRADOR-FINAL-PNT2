<template>
  <ListaProductos
    :productos="productos"
    :categorias="categories"
    :cargando="loading"
    titulo="Productos Generales"
    mensajeCarga="Cargando productos..."
    mensajeVacio="No se encontraron productos"
    :mostrarFiltros="true"
    :mostrarResumen="true"
    :mostrarBotonEliminar="false"
    @completar-pedido="completarPedido"
  />
</template>

<script>
import ServicioProductos from '@/servicios/productos.js'
import ListaProductos from '@/components/ListaProductos.vue';

export default {
  name: 'ProductosGenerales',
  components: {
    ListaProductos
  },
  data() {
    return {
      loading: true,
      productos: [],
      categories: []
    }
  },
  methods: {
    completarPedido() {
      console.log('Completar pedido desde productos generales')
      this.$router.push('/carro-de-compras')
    }
  },
  async mounted() {
    const servicio = new ServicioProductos()
    this.loading = true
    this.productos = await servicio.getAll()

    this.productos.forEach(p => {
      if (!p.cantidad) p.cantidad = 0
    })
    const uniqueCats = [...new Set(this.productos.map(p => p.category))]
    this.categories = uniqueCats
    this.loading = false
  }
}
</script>
