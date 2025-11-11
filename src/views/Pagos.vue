<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h3 class="mb-0">Información de Pago</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="procesarPago">
              <!-- Datos personales -->
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="nombre" v-model="formData.nombre" required>
              </div>

              <!-- Datos de la tarjeta -->
              <div class="mb-3">
                <label for="numeroTarjeta" class="form-label">Número de tarjeta</label>
                <input type="text" class="form-control" id="numeroTarjeta" v-model="formData.numeroTarjeta" required>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="fechaVencimiento" class="form-label">Fecha de vencimiento</label>
                  <input type="text" class="form-control" id="fechaVencimiento" placeholder="MM/AA" v-model="formData.fechaVencimiento" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cvv" class="form-label">CVV</label>
                  <input type="text" class="form-control" id="cvv" v-model="formData.cvv" required>
                </div>
              </div>

              <!-- Total y botón de pago -->
              <div class="mb-3">
                <h4>Total a pagar: ${{ total }}</h4>
              </div>

              <button type="submit" class="btn btn-primary w-100">
                Realizar Pago
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagos',
  data() {
    return {
      total: 0,
      formData: {
        nombre: '',
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvv: ''
      }
    }
  },
  methods: {
    procesarPago() {
      // Aquí irá la lógica para procesar el pago
      console.log('Procesando pago...', this.formData)
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: none;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>