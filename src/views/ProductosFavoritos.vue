<template>
  <ListaProductos
    :productos="productosFavoritos"
    :cargando="false"
    titulo="Mis favoritos"
    mensajeVacio="No tienes productos favoritos aún"
    :mostrarFiltros="false"
    :mostrarResumen="false"
    :mostrarBotonEliminar="true"
    @eliminar-producto="eliminarDeFavoritos"
  />
</template>

<script>
import ListaProductos from '@/components/ListaProductos.vue'
import { useGlobalStore } from '@/estadoGlobal/global'

export default {
  name: 'ProductosFavoritos',
  components: {
    ListaProductos
  },
  data() {
    return {
      globalStore: useGlobalStore()
    }
  },
  computed: {
    productosFavoritos() {
      return this.globalStore.getFavoritos
    }
  },
  methods: {
    eliminarDeFavoritos(id) {
      this.globalStore.eliminarDeFavoritos(id)
    }
  }
}
</script>
