<template>
  <div class="checkout-wrapper">
    <!-- Resumen del Pedido -->
    <div class="order-summary card">
      <h3>Resumen del Pedido</h3>
      <div class="order-total">
        <span>Total a Pagar:</span>
        <strong>$ XXX.XX</strong>
      </div>
    </div>

    <!-- Formulario de Pago -->
    <div class="checkout-form card">
      <h2>Información de Pago</h2>

      <form novalidate @submit.prevent="enviarFormulario">
        <div class="form-group">
          <label for="nombre">Nombre del titular:</label>
          <input
            id="nombre"
            type="text"
            v-model.trim="formData.nombre"
            @input="formDirty.nombre = true"
            class="form-control"
            :class="{ 'is-invalid': errorNombre.mostrar }"
            placeholder="Como aparece en la tarjeta"
          />
          <div v-if="errorNombre.mostrar" class="error-message">
            {{ errorNombre.mensaje }}
          </div>
        </div>

        <div class="form-group">
          <label for="numeroTarjeta">Número de tarjeta:</label>
          <input
            id="numeroTarjeta"
            type="text"
            v-model.trim="formData.numeroTarjeta"
            @input="formDirty.numeroTarjeta = true"
            maxlength="16"
            class="form-control"
            :class="{ 'is-invalid': errorNumeroTarjeta.mostrar }"
            placeholder="XXXX XXXX XXXX XXXX"
          />
          <div v-if="errorNumeroTarjeta.mostrar" class="error-message">
            {{ errorNumeroTarjeta.mensaje }}
          </div>
        </div>

        <div class="flex-row">
          <div class="form-group half-width">
            <label for="cvv">CVV:</label>
            <input
              id="cvv"
              type="text"
              v-model.trim="formData.cvv"
              @input="formDirty.cvv = true"
              maxlength="4"
              class="form-control"
              :class="{ 'is-invalid': errorCvv.mostrar }"
              placeholder="123"
            />
            <div v-if="errorCvv.mostrar" class="error-message">
              {{ errorCvv.mensaje }}
            </div>
          </div>

          <div class="form-group half-width">
            <label for="expiracion">Expiración (MM/AA):</label>
            <input
              id="expiracion"
              type="text"
              v-model.trim="formData.expiracion"
              @input="formDirty.expiracion = true"
              maxlength="5"
              placeholder="MM/AA"
              class="form-control"
              :class="{ 'is-invalid': errorExpiracion.mostrar }"
            />
            <div v-if="errorExpiracion.mostrar" class="error-message">
              {{ errorExpiracion.mensaje }}
            </div>
          </div>
        </div>

        <div class="button-container">
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="botonEnvioDeshabilitado"
          >
            Pagar
          </button>
        </div>

        <p v-if="mensaje" class="alert-success mt-3">{{ mensaje }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { useCheckoutStore } from '../stores/checkout'

export default {
  name: 'CheckoutView',
  data() {
    return {
      formData: this.getInicialData(),
      formDirty: this.getInicialData(),
      mensaje: ''
    }
  },
  computed: {
    errorNombre() {
      let mensaje = ''
      if (!this.formData.nombre) mensaje = 'Campo requerido'
      else if (this.formData.nombre.length < 3)
        mensaje = 'Debe tener al menos 3 caracteres'
      return { mensaje, mostrar: mensaje && this.formDirty.nombre, ok: !mensaje }
    },
    errorNumeroTarjeta() {
      let mensaje = ''
      if (!this.formData.numeroTarjeta) mensaje = 'Campo requerido'
      else if (!/^\d+$/.test(this.formData.numeroTarjeta))
        mensaje = 'Solo se permiten números'
      else if (this.formData.numeroTarjeta.length !== 16)
        mensaje = 'Debe tener 16 dígitos'
      return {
        mensaje,
        mostrar: mensaje && this.formDirty.numeroTarjeta,
        ok: !mensaje
      }
    },
    errorCvv() {
      let mensaje = ''
      if (!this.formData.cvv) mensaje = 'Campo requerido'
      else if (!/^\d+$/.test(this.formData.cvv))
        mensaje = 'Solo se permiten números'
      else if (this.formData.cvv.length < 3 || this.formData.cvv.length > 4)
        mensaje = 'Debe tener 3 o 4 dígitos'
      return { mensaje, mostrar: mensaje && this.formDirty.cvv, ok: !mensaje }
    },
    errorExpiracion() {
      let mensaje = ''
      if (!this.formData.expiracion) mensaje = 'Campo requerido'
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.formData.expiracion))
        mensaje = 'Formato inválido (MM/AA)'
      return {
        mensaje,
        mostrar: mensaje && this.formDirty.expiracion,
        ok: !mensaje
      }
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
    enviarFormulario() {
      if (this.botonEnvioDeshabilitado) return

      const store = useCheckoutStore()
      store.guardarDatos(
        this.formData.nombre,
        this.formData.numeroTarjeta,
        this.formData.cvv,
        this.formData.expiracion
      )

      this.mensaje = 'Pago procesado correctamente ✅'
      this.formData = this.getInicialData()
      this.formDirty = this.getInicialData()

      setTimeout(() => (this.mensaje = ''), 3000)
    }
  }
}
</script>

<style scoped>
.checkout-wrapper {
  display: flex;
  max-width: 900px;
  margin: 2rem auto;
  gap: 20px;
  align-items: flex-start;
}
.card {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
.order-summary {
  flex: 0 0 300px;
  position: sticky;
  top: 20px;
}
.order-summary h3 {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}
.checkout-form {
  flex: 1;
  max-width: 550px;
}
.form-group {
  margin-bottom: 18px;
}
label {
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 0.95rem;
  color: #444;
}
input {
  padding: 10px 12px;
  transition: border-color 0.3s;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}
input.is-invalid {
  border-color: #b10000;
}
input:focus {
  border-color: #2a84a5;
  box-shadow: 0 0 0 3px rgba(42, 132, 165, 0.2);
  outline: none;
}
.flex-row {
  display: flex;
  gap: 20px;
}
.half-width {
  flex: 1;
}
.button-container {
  text-align: center;
  margin-top: 1.2rem;
}
button {
  background-color: #ffbb00;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: background-color 0.3s;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover:not(:disabled) {
  background-color: #e4af1a;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error-message {
  font-size: 0.85rem;
  color: #b10000;
  margin-top: 5px;
}
.alert-success {
  background-color: #e6ffe6;
  border: 1px solid #0b7300;
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  text-align: center;
}
</style>
