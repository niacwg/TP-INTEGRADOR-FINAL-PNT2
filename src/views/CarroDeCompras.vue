<template>
  <div class="container mt-5">
    <h2 class="mb-4">Carrito de Compras</h2>

    <!-- Productos en el carrito -->
    <div v-if="items.length > 0">
      <div class="card mb-3" v-for="item in items" :key="item.id">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img :src="item.imagen" :alt="item.nombre" class="img-fluid">
            </div>
            <div class="col-md-4">
              <h5 class="card-title">{{ item.nombre }}</h5>
              <p class="card-text">{{ item.descripcion }}</p>
            </div>
            <div class="col-md-2">
              <div class="input-group">
                <button class="btn btn-outline-secondary" @click="decrementarCantidad(item)">-</button>
                <input type="number" class="form-control text-center" v-model="item.cantidad" min="1">
                <button class="btn btn-outline-secondary" @click="incrementarCantidad(item)">+</button>
              </div>
            </div>
            <div class="col-md-2 text-center">
              <p class="mb-0">${{ item.precio }}</p>
            </div>
            <div class="col-md-2 text-end">
              <button class="btn btn-danger" @click="eliminarItem(item)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen del carrito -->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <h4>Total:</h4>
            </div>
            <div class="col-md-4 text-end">
              <h4>${{ total }}</h4>
            </div>
          </div>
          <div class="d-grid gap-2 mt-3">
            <button class="btn btn-primary" @click="procederPago">
              Proceder al pago
            </button>
            <button class="btn btn-outline-secondary" @click="seguirComprando">
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrito vacío -->
    <div v-else class="text-center">
      <p>No hay productos en el carrito</p>
      <button class="btn btn-primary" @click="seguirComprando">
        Ir a comprar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarroDeCompras',
  data() {
    return {
      items: [],
      total: 0
    }
  },
  methods: {
    incrementarCantidad(item) {
      item.cantidad++
    },
    decrementarCantidad(item) {
      if (item.cantidad > 1) {
        item.cantidad--
      }
    },
    eliminarItem(item) {
      this.items = this.items.filter(i => i.id !== item.id)
    },
    procederPago() {
      this.$router.push('/pagos')
    },
    seguirComprando() {
      this.$router.push('/productos')
    }
  }
}
</script>

<style scoped>
.img-fluid {
  max-height: 100px;
  object-fit: contain;
}

input[type="number"] {
  max-width: 60px;
}

.input-group {
  width: fit-content;
}
</style>