<template>
  <div class="container mt-5">
    <h2 class="mb-4">Carrito de Compras</h2>

    <div v-if="items.length > 0" class="product-list">

      <div class="product-item" v-for="item in items" :key="item.id">

        <div class="product-image-container">
          <img :src="item.image" :alt="item.title">
        </div>
        <div class="product-info">
          <h4 class="product-brand">{{ item.category }}</h4>
          <h3 class="product-name">{{ item.title }}</h3>
          <p class="product-size">{{ item.description.substring(0, 60) }}...</p>
        </div>

        <div class="product-controls">
          <div class="quantity-controls">
            <button class="btn-quantity" @click="decrementarCantidad(item)" :disabled="item.cantidad <= 1">
              -
            </button>
            <span class="quantity-input">{{ item.cantidad }}</span>
            <button class="btn-quantity" @click="incrementarCantidad(item)">+</button>
          </div>
        </div>

        <div class="product-price">
          <p class="mb-0 text-muted small">${{ item.price }} c/u</p> 
          <span class="price">${{ (item.price * item.cantidad).toFixed(2) }}</span>
        </div>


        <div class="btn-remove-container">
          <button class="btn-favorite" title="Guardar para después" @click="globalStore.moverAGuardados(item.id)">
            <i class="bi bi-bookmark"></i>
          </button>

          <button class="btn-remove" @click="eliminarItem(item)">
            <i class="bi bi-trash"></i>
          </button>
        </div>


      </div>
      <div class="cart-summary">
        <div class="total">
          <span>Total:</span>
          <span class="total-amount">${{ total }}</span>
        </div>
        <div class="d-grid gap-2 mt-3">
         <button class="btn btn-success w-100" @click="procederPago">
            Completar pedido
          </button>

          <button class="btn btn-outline-secondary w-100" @click="seguirComprando">
            Seguir comprando
          </button>
        </div>
      </div>



      <h4 v-if="globalStore.guardados.length > 0" class="mt-5 mb-3">Artículos guardados para después</h4>

      <div v-if="globalStore.guardados.length > 0" class="product-list">
        <div class="product-item saved-item" v-for="item in globalStore.guardados" :key="item.id">

          <div class="product-image-container">
            <img :src="item.image" :alt="item.title">
          </div>

          <div class="product-info">
            <h4 class="product-brand">{{ item.category }}</h4>
            <h3 class="product-name">{{ item.title }}</h3>
          </div>

          <div class="product-controls">
            <button class="btn btn-sm btn-outline-success" @click="globalStore.moverACarrito(item.id)">
              Mover al carrito
            </button>
          </div>

          <div class="product-price">
            <span class="price">${{ item.price.toFixed(2) }}</span>
          </div>

          <div class="btn-remove-container">
            <button class="btn-remove" title="Eliminar permanentemente"
              @click="globalStore.removerItemGuardado(item.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>


    </div>
    <div v-else class="text-center">
      <p>No hay productos en el carrito</p>
      <button class="btn btn-primary" @click="seguirComprando">
        Ir a comprar
      </button>
    </div>

  </div>
</template>


<script>
import { useGlobalStore } from '@/estadoGlobal/global';

export default {
  name: 'CarroDeCompras',

  setup() {
    const globalStore = useGlobalStore();
    return {
      globalStore,
      items: globalStore.carrito,
    };
  },

  computed: {
    total() {
      return this.globalStore.getCantidadTotal().toFixed(2);
    }
  },

  data() {
    return {
    }
  },

  methods: {

    incrementarCantidad(item) {
      this.globalStore.agregarProducto(item);
    },

    decrementarCantidad(item) {
      this.globalStore.eliminarProducto(item.id);
    },

    eliminarItem(item) {
      if (confirm(`¿Estás seguro de que quieres eliminar ${item.title} del carrito?`)) {
        this.globalStore.removerProductoCompletamente(item.id);
      }
    },

    procederPago() {
      this.$router.push('/pagos')
    },

    seguirComprando() {
      this.$router.push('/productos-generales')
    }
  }
}
</script>

<style scoped>
.productos-generales {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
  width: 100%;
  max-width: 1100px;
  height: 200px;
  box-shadow: 0px 4px 10px -5px rgba(102, 102, 102, 0.5);
}

.product-image-container {
  width: 100%;
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

.btn-favorite,
.btn-remove {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #666;
}

.btn-remove-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-remove {
  font-size: 18px;
  color: #dc3545;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
  width: 100%;
  max-width: 1100px;
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

  .product-controls,
  .product-price,
  .btn-remove-container {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }

  .saved-item {
    background-color: #fafafa;
    opacity: 0.85;
    box-shadow: 0px 2px 5px -3px rgba(102, 102, 102, 0.3);
  }

  .saved-item .product-controls {
    grid-column: 3 / span 1;
  }
}
</style>