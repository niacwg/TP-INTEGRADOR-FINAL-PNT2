<template>
  <div class="productos-generales container">
    
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="cart-title mb-0">PRODUCTOS</h2>

      <div class="ms-3" style="min-width:220px">
        <select class="form-select" v-model="selectedCategory" aria-label="Filtrar por categoría">
          <option value="Todas">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>
    
    <div class="products-container">
      <div v-if="loading" class="loading">
        Cargando productos...
      </div>
      
      <div v-else-if="productos.length === 0" class="no-products">
        No se encontraron productos
      </div>
      
      <div v-else class="product-list">
        <div class="product-item" v-for="producto in displayedProducts" :key="producto.id">
          <div class="product-image-container">
            <img :src="producto.image" :alt="producto.title">
          </div>
          <div class="product-info">
            <h4 class="product-brand">{{ producto.category }}</h4>
            <h3 class="product-name">{{ producto.title }}</h3>
            <p class="product-size">{{ producto.description.substring(0, 60) }}...</p>
          </div>
          <div class="product-controls">
            <div class="quantity-controls">
              <button class="btn-quantity" @click="globalStore.eliminarProducto(producto.id)">-</button>
              <span class="quantity-input">{{ globalStore.getCantidadProducto(producto.id) }}</span>
              <button class="btn-quantity" @click="globalStore.agregarProducto(producto)">+</button>
            </div>
            <button class="btn-favorite" title="Agregar a favoritos">
              <i class="bi bi-heart"></i>
            </button>
            <button class="btn btn-link p-0" @click="verDetalle(producto.id)">
             Ver detalle
            </button>
          </div>
          <div class="product-price">
            <span class="price">${{ producto.price }}</span>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="total">
          <span>Total:</span>
          <span v-if="globalStore && globalStore.getCantidadTotal" class="total-amount">${{ globalStore.getCantidadTotal.toFixed(2) }}</span>
        </div>
        <button class="btn btn-success w-100">Completar pedido</button>
      </div>
    </div>
  </div>
</template>

<script>
import ServicioProductos from '@/servicios/productos.js'
import { useGlobalStore } from '@/estadoGlobal/global';
export default {
  name: 'ProductosGenerales',
  data() {
    return {
      globalStore: useGlobalStore(),
      loading: true,
      searchQuery: '',
      categories: [],
      selectedCategory: 'Todas',
      total: 0 // Inicializamos el total en 0
    }
  },
  computed: {
    // productos filtrados según categoría seleccionada
    displayedProducts() {
      if (this.selectedCategory === 'Todas') return this.productos
      return this.productos.filter(p => p.category === this.selectedCategory)
    }
  },
  methods: {
    verDetalle(id) {
      this.$router.push(`/producto/${id}`)
    },
    incrementarCantidad(producto) {
      producto.cantidad++
      this.total += producto.price // Incrementamos el total
    },
    decrementarCantidad(producto) {
      if (producto.cantidad && producto.cantidad > 1) {
        producto.cantidad--
        this.total -= producto.price // Decrementamos el total
      }
    }
  },
  async mounted() {
    const servicio = new ServicioProductos()
    this.loading = true
    this.productos = await servicio.getAll()  // aquí verás el console.log del servicio en la consola del navegador

    // inicializar cantidad y extraer categorías únicas
    this.productos.forEach(p => {
      if (!p.cantidad) p.cantidad = 0
    })
    const uniqueCats = [...new Set(this.productos.map(p => p.category))]
    this.categories = uniqueCats
    this.loading = false
  }
}
</script>

<style scoped>
.productos-generales {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  color: #666;
  cursor: pointer;
}

.cart-title {
  font-size: 24px;
  font-weight: 500;
}

.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
  width: 100%;
}

.product-item {
  display: grid;
  grid-template-columns: 130px 2fr 1fr auto auto;
  gap: 20px;
  align-items: center;
  padding: 15px;
  background: white;
  border: 1px solid #eee;
  width: 1100px;
  height: 200px;
  box-shadow: 0px 4px 10px -5px rgba(102, 102, 102, 0.5); 

}

.product-image-container {
  width: 150px;
  height: 160px;
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-info {
  min-width: 200px;
}

.product-brand {
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.product-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.product-size {
  color: #666;
  font-size: 12px;
}

.product-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-quantity {
  border: none;
  background: none;
  padding: 5px 12px;
  cursor: pointer;
  color: #666;
}

.quantity-input {
  padding: 0 10px;
  min-width: 30px;
  text-align: center;
}

.product-price {
  font-size: 16px;
  font-weight: 500;
}

.btn-favorite, .btn-remove {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #666;
}

.btn-remove {
  font-size: 18px;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .product-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    height: auto;
  }
  
  .product-controls, .product-price, .btn-remove {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}
</style>