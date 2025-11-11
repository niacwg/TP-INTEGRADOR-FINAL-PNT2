import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    carrito: [],  
  }),

  getters: {
    // devuelve el carrito completo
    getCarrito: (state) => state.carrito,

    // devuelve la cantidad de un producto por id
    getCantidadProducto: (state) => (id) => {
      const producto = state.carrito.find(item => item.id === id);
      return producto ? producto.cantidad : 0;
    },

    // 👇 AHORA ES GETTER, NO ACTION
    getCantidadTotal: (state) => {
      return state.carrito.reduce((total, producto) => {
        const precio = producto.price || 0;
        const cantidad = producto.cantidad || 0;
        return total + precio * cantidad;
      }, 0);
    }
  },

  actions: {
    agregarProducto(producto) {
      if (!producto) return;

      const productoExistente = this.carrito.find(item => item.id === producto.id);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        // guardamos solo lo que necesitamos + cantidad
        this.carrito.push({
          id: producto.id,
          title: producto.title,
          price: producto.price,
          image: producto.image,
          category: producto.category,
          description: producto.description,
          cantidad: 1
        });
      }

      console.log("Producto agregado:", producto);
      console.log("Carrito actual:", this.carrito);
    },

    eliminarProducto(id) {
      if (!id) return;

      const productoExistente = this.carrito.find(item => item.id === id);
      if (!productoExistente) return;

      if (productoExistente.cantidad > 1) {
        productoExistente.cantidad--;
      } else {
        // si llega a 1 y se resta, lo saco del carrito
        this.carrito = this.carrito.filter(item => item.id !== id);
      }
    },

    vaciarCarrito() {
      this.carrito = [];
    }
  },
});
