import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    nombre: '',
    numeroTarjeta: '',
    cvv: ''
  }),
  actions: {
    guardarDatos(nombre, numeroTarjeta, cvv) {
      this.nombre = nombre
      this.numeroTarjeta = numeroTarjeta
      this.cvv = cvv
    }
  }
})
