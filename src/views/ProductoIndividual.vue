<template>
  <div class="producto-individual">
    <div v-if="loading" class="loading">
      Cargando producto...
    </div>

    <div v-else-if="!producto" class="error">
      Producto no encontrado
    </div>

    <div v-else class="producto-detalle">
      <div class="producto-imagen">
        <img :src="producto.image" :alt="producto.title">
      </div>
      
      <div class="producto-info">
        <h1>{{ producto.title }}</h1>
        <p class="categoria">Categoría: {{ producto.category }}</p>
        <p class="descripcion">{{ producto.description }}</p>
        <p class="precio">
          ${{ producto.price.toLocaleString('es-AR') }}
        </p>
        <button class="btn-volver" @click="volverAtras">
          Volver
        </button>
        <button class="btn-agregar" @click="agregarAlCarrito">
        Agregar al carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ServicioProductos from '../servicios/productos' 
import { useGlobalStore } from '@/estadoGlobal/global'

const servicioProductos = new ServicioProductos()

export default {
  name: 'ProductoIndividual',
  data() {
    return {
      producto: null,
      loading: true,
      globalStore: useGlobalStore()
    }
  },
  methods: {
    volverAtras() {
      this.$router.go(-1)
    },
    async cargarProducto() {
      this.loading = true
      const id = this.$route.params.id   // viene de /producto/:id
      const producto = await servicioProductos.getById(id)
      this.producto = producto
      this.loading = false
    },
    agregarAlCarrito() {
      if (this.producto) {
        this.globalStore.agregarProducto(this.producto)
        alert('Producto agregado al carrito 🛒')
      }
    }
  },
  mounted() {
    this.cargarProducto()
  }
}
</script>
<style scoped>
.producto-individual {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.producto-detalle {
  display: grid;
  grid-template-columns: 400px 1fr; 
  align-items: center;             
  gap: 30px;
  padding: 20px;
  min-height: 80vh;                
}

.producto-imagen {
  display: flex;
  align-items: center;
  justify-content: center;
}

.producto-imagen img {
  max-width: 250px;   
  max-height: 300px;  
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.producto-info {
  padding: 20px;
}

.producto-info h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.categoria {
  color: #666;
  margin-bottom: 15px;
}

.descripcion {
  line-height: 1.6;
  margin-bottom: 20px;
}

.precio {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 20px;
}

.btn-volver {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-volver:hover {
  background-color: #3aa876;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .producto-detalle {
    grid-template-columns: 1fr;
  }
}

.btn-agregar {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-agregar:hover {
  background-color: #0069d9;
}

</style>