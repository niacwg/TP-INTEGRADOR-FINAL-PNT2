<template>
  <div class="checkout-wrapper">

    <div v-if="!pagoProcesado" class="checkout-grid">

      <div class="checkout-form card">
        <h2>Información de Pago</h2>

        <form novalidate @submit.prevent="enviarFormulario">

          <div class="form-group">
            <label>Nombre del titular:</label>
            <input
              type="text"
              v-model.trim="formData.nombre"
              placeholder="Ej: Juan Pérez"
              @input="formDirty.nombre = true"
              class="form-control"
              :class="{ 'is-invalid': errorNombre.mostrar }"
            />
            <div v-if="errorNombre.mostrar" class="alert alert-danger my-1">
              {{ errorNombre.mensaje }}
            </div>
          </div>

          <div class="form-group">
            <label>Número de tarjeta</label>
            <input
              type="text"
              v-model.trim="formData.numeroTarjeta"
              placeholder="XXXX XXXX XXXX XXXX"
              @input="formDirty.numeroTarjeta = true"
              maxlength="16"
              class="form-control"
              :class="{ 'is-invalid': errorNumeroTarjeta.mostrar }"
            />
            <div v-if="errorNumeroTarjeta.mostrar" class="alert alert-danger my-1">
              {{ errorNumeroTarjeta.mensaje }}
            </div>
          </div>

          <div class="flex-row">
            <div class="form-group half-width">
              <label>CVV</label>
              <input
                type="text"
                v-model.trim="formData.cvv"
                placeholder="123"
                @input="formDirty.cvv = true"
                maxlength="4"
                class="form-control"
                :class="{ 'is-invalid': errorCvv.mostrar }"
              />
              <div v-if="errorCvv.mostrar" class="alert alert-danger my-1">
                {{ errorCvv.mensaje }}
              </div>
            </div>

            <div class="form-group half-width">
              <label>Expiración (MM/AA)</label>
              <input
                type="text"
                v-model.trim="formData.expiracion"
                placeholder="MM/AA"
                @input="formDirty.expiracion = true"
                maxlength="5"
                class="form-control"
                :class="{ 'is-invalid': errorExpiracion.mostrar }"
              />
              <div v-if="errorExpiracion.mostrar" class="alert alert-danger my-1">
                {{ errorExpiracion.mensaje }}
              </div>
            </div>
          </div>

          <div class="button-container">
            <button class="btn btn-primary" :disabled="botonEnvioDeshabilitado">
              Pagar
            </button>
          </div>

        </form>
      </div>

      <aside class="order-summary card">
        <h3>Resumen del Pedido</h3>

        <div class="order-items" v-if="cartItems.length">
          <div class="order-item" v-for="item in cartItems" :key="item.id">
            <img class="thumb" :src="item.image" />
            <div class="item-info">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-meta">
                <span>x{{ item.cantidad }}</span>
                <span>${{ subtotal(item) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else>No hay productos en el carrito</div>

        <div class="order-total">
          <span>Total:</span>
          <strong>$ {{ totalFormatted }}</strong>
        </div>
      </aside>

    </div>

    <div v-else class="pago-exitoso-wrapper">
      <div class="pago-exitoso-card">
        Pago procesado correctamente ¡Gracias por su compra!
      </div>
    </div>

  </div>
</template>

<script>
import { useCheckoutStore } from '@/stores/checkout'
import { useGlobalStore } from '@/estadoGlobal/global'

export default {
  name: 'Pagos',

  data() {
    return {
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
      pagoProcesado: false
    }
  },

  computed: {
    globalStore() {
      return useGlobalStore()
    },

    cartItems() {
      return this.globalStore.getCarrito || []
    },

    totalFormatted() {
      const fn = this.globalStore.getCantidadTotal
      return (typeof fn === 'function' ? fn() : fn || 0).toFixed(2)
    },

    errorNombre() {
      let msg = ''
      if (!this.formData.nombre) msg = 'Campo requerido'
      else if (this.formData.nombre.length < 3) msg = 'Mínimo 3 caracteres'
      return { mensaje: msg, mostrar: msg && this.formDirty.nombre, ok: !msg }
    },

    errorNumeroTarjeta() {
      let msg = ''
      if (!this.formData.numeroTarjeta) msg = 'Campo requerido'
      else if (!/^\d+$/.test(this.formData.numeroTarjeta)) msg = 'Solo números'
      else if (this.formData.numeroTarjeta.length !== 16) msg = 'Debe tener 16 dígitos'
      return { mensaje: msg, mostrar: msg && this.formDirty.numeroTarjeta, ok: !msg }
    },

    errorCvv() {
      let msg = ''
      if (!this.formData.cvv) msg = 'Campo requerido'
      else if (!/^\d+$/.test(this.formData.cvv)) msg = 'Solo números'
      else if (this.formData.cvv.length < 3 || this.formData.cvv.length > 4) msg = '3 o 4 dígitos'
      return { mensaje: msg, mostrar: msg && this.formDirty.cvv, ok: !msg }
    },

    errorExpiracion() {
      let msg = ''
      if (!this.formData.expiracion) msg = 'Campo requerido'
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.formData.expiracion)) msg = 'Formato MM/AA'
      return { mensaje: msg, mostrar: msg && this.formDirty.expiracion, ok: !msg }
    },

    botonEnvioDeshabilitado() {
      return !(
        this.errorNombre.ok &&
        this.errorNumeroTarjeta.ok &&
        this.errorCvv.ok &&
        this.errorExpiracion.ok
      )
    }
  },

  methods: {
    getInicialData() {
      return { nombre: '', numeroTarjeta: '', cvv: '', expiracion: '' }
    },

    subtotal(item) {
      return ((item.price || item.precio || 0) * (item.cantidad || 1)).toFixed(2)
    },

    enviarFormulario() {
      if (this.botonEnvioDeshabilitado) return

      const store = useCheckoutStore()
      store.guardarDatos(
        this.formData.nombre,
        this.formData.numeroTarjeta,
        this.formData.cvv,
        this.formData.expiracion
      )

      this.pagoProcesado = true
      this.formData = this.getInicialData()
      this.formDirty = this.getInicialData()
    }
  }
}
</script>

<style scoped>
.checkout-wrapper {
  width: 100%;
  min-height: 100vh;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  max-width: 1100px;
  margin: 2rem auto;
  gap: 20px;
}

.checkout-form,
.order-summary {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 420px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.thumb {
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 8px;
}

.order-total {
  margin-top: 20px;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
}

.button-container {
  margin-top: 25px;
}

.pago-exitoso-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.pago-exitoso-card {
  font-size: 2rem;
  background: #e8f9ee;
  color: #0a7a28;
  padding: 45px 65px;
  border-radius: 18px;
  font-weight: bold;
  box-shadow: 0 0 25px rgba(0,0,0,0.18);
  border: 2px solid #3cc56a;
}

.alert.my-1 {
  padding: 6px 10px;
  font-size: 0.875rem;
}
</style>
