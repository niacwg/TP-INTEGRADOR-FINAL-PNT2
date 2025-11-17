<template>
  <div class="productos-container container">
    
    <!-- Header con título y filtros opcionales -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="cart-title mb-0">{{ titulo }}</h2>

      <div v-if="mostrarFiltros" class="ms-3" style="min-width:220px">
        <select class="form-select" v-model="categoriaSeleccionada" aria-label="Filtrar por categoría">
          <option value="Todas">Todas las categorías</option>
          <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>
    
    <div class="products-container">
      <!-- Loading state -->
      <div v-if="cargando" class="loading">
        {{ mensajeCarga }}
      </div>
      
      <!-- Empty state -->
      <div v-else-if="productosParaMostrar.length === 0" class="no-products">
        {{ mensajeVacio }}
      </div>
      
      <!-- Products list -->
      <div v-else class="product-list">
        <div class="product-item" v-for="producto in productosParaMostrar" :key="producto.id">
        <div class="product-image-container" @click="verDetalle(producto.id)" style="cursor: pointer">
          <img :src="producto.image" :alt="producto.title">
        </div>
          
          <div class="product-info" @click="verDetalle(producto.id)" style="cursor: pointer">
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
            
            <button 
              class="btn-favorite" 
              @click="globalStore.toggleFavorito(producto)"
              :title="globalStore.esFavorito(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
            >
              <i 
                class="bi"
                :class="globalStore.esFavorito(producto.id) ? 'bi-heart-fill heart-active' : 'bi-heart'"
              ></i>
            </button>

            <!-- Botón de eliminar para favoritos -->
            <button 
              v-if="mostrarBotonEliminar"
              class="btn-remove" 
              @click="$emit('eliminar-producto', producto.id)"
              title="Eliminar de favoritos"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div class="product-price">
            <span class="price">${{ producto.price }}</span>
          </div>
        </div>
      </div>

      <!-- Cart summary (opcional) -->
      <div v-if="mostrarResumen" class="cart-summary">
        <div class="total">
          <span>Total:</span>
          <span class="total-amount">${{ globalStore.getCantidadTotal().toFixed(2) }}</span>
        </div>
        <button class="btn btn-success w-100" @click="$emit('completar-pedido')">
          {{ textoBotonPedido }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useGlobalStore } from '@/estadoGlobal/global';

export default {
  name: 'ListaProductos',
  props: {
    // Productos a mostrar
    productos: {
      type: Array,
      required: true,
      default: () => []
    },
    // Título de la sección
    titulo: {
      type: String,
      default: 'PRODUCTOS'
    },
    // Categorías para filtro
    categorias: {
      type: Array,
      default: () => []
    },
    // Estados de carga
    cargando: {
      type: Boolean,
      default: false
    },
    mensajeCarga: {
      type: String,
      default: 'Cargando productos...'
    },
    mensajeVacio: {
      type: String,
      default: 'No se encontraron productos'
    },
    // Configuración de UI
    mostrarFiltros: {
      type: Boolean,
      default: true
    },
    mostrarResumen: {
      type: Boolean,
      default: true
    },
    mostrarBotonEliminar: {
      type: Boolean,
      default: false
    },
    textoBotonPedido: {
      type: String,
      default: 'Completar pedido'
    }
  },
  methods: {
   verDetalle(id) {
      this.$router.push({ name: 'producto-individual', params: { id } });
    }
  },
  emits: ['eliminar-producto', 'completar-pedido'],
  data() {
    return {
      globalStore: useGlobalStore(),
      categoriaSeleccionada: 'Todas'
    }
  },
  computed: {
    productosParaMostrar() {
      if (!this.mostrarFiltros || this.categoriaSeleccionada === 'Todas') {
        return this.productos
      }
      return this.productos.filter(p => p.category === this.categoriaSeleccionada)
    }
  }
}
</script>

<style scoped>
.productos-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-title {
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
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

.product-image-container:hover,
.product-info:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.product-name:hover {
  color: #42b983;
  transition: color 0.2s ease;
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
  transition: color 0.3s ease;
  font-size: 18px;
}

.btn-favorite .bi-heart {
  color: #666;
}

.btn-favorite .bi-heart-fill.heart-active {
  color: #dc3545 !important;
}

.btn-favorite:hover .bi-heart {
  color: #dc3545;
}

.btn-remove:hover {
  color: #dc3545;
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

.loading, .no-products {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

@media (max-width: 768px) {
  .product-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    height: auto;
  }
  
  .product-controls, .product-price {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}
</style>
