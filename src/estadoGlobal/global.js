import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        carrito: [],  
    }),
    getters: {
        getCarrito: state => state.carrito,
        getCantidadProducto: (state) => (id) => {
         const producto = state.carrito.find(item => item.id === id);
        return producto ? producto.cantidad : 0; 
        },  
    },  
    actions: {
        agregarProducto(producto) {
            if (!producto) return;
            const productoExistente = this.carrito.find(item => item.id === producto.id);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                this.carrito.push({ ...producto, cantidad: 1 });
            }
            console.log("Producto agregado:", producto);
            console.log("Carrito actual:", this.carrito);
        },
        getCantidadTotal() {
            return this.carrito.reduce((total, producto) => {
                const precio = producto.price || 0;
                const cantidad = producto.cantidad || 0;
                return total + precio * cantidad;
            }, 0);
        },
        eliminarProducto(id) {
            if (!id) return;
            const productoExistente = this.carrito.find(item => item.id === id);
            if (productoExistente) {
                if (productoExistente.cantidad > 0) {
                    productoExistente.cantidad--;
                }
            }
        }
    },
});

