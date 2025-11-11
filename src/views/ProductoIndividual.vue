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
        <img :src="producto.imagen" :alt="producto.nombre">
      </div>
      
      <div class="producto-info">
        <h1>{{ producto.nombre }}</h1>
        <p class="categoria">Categoría: {{ producto.categoria }}</p>
        <p class="descripcion">{{ producto.descripcion }}</p>
        <p class="precio">${{ producto.precio }}</p>
        <button class="btn-volver" @click="volverAtras">
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoIndividual',
  data() {
    return {
      producto: null,
      loading: true
    }
  },
  methods: {
    volverAtras() {
      this.$router.go(-1)
    }
  },
  mounted() {
    // Aquí irá la lógica para obtener el producto específico
    this.loading = false
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
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 20px;
}

.producto-imagen img {
  width: 100%;
  max-width: 500px;
  height: auto;
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
</style>