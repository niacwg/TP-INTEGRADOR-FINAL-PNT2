import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        carrito: [],
        productosFavoritos: [],
        guardados: [],
    }),
    getters: {
        getCarrito: state => state.carrito,
        getCantidadProducto: (state) => (id) => {
            const producto = state.carrito.find(item => item.id === id);
            return producto ? producto.cantidad : 0;
        },
        totalItems: (state) => {
            return state.carrito.reduce((total, producto) => total + (producto.cantidad || 0), 0);
        },
        esFavorito: (state) => (id) => {
            return state.productosFavoritos.some(item => item.id === id);
        },
        getFavoritos: state => state.productosFavoritos, 
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
        },

        removerProductoCompletamente(id) {
            this.carrito = this.carrito.filter(item => item.id !== id);
        },

        removerItemGuardado(id) {
            const index = this.carrito.findIndex(item => item.id === id);

            if (index !== -1) {
                const [item] = this.carrito.splice(index, 1);
                this.guardados.push(item);
            }
        },

        moverACarrito(id) {
            const index = this.guardados.findIndex(item => item.id === id);

            if (index !== -1) {
                const [item] = this.guardados.splice(index, 1);
                this.carrito.push(item);
            }
        },
        toggleFavorito(producto) {
            const index = this.productosFavoritos.findIndex(item => item.id === producto.id);
            if (index !== -1) {
                this.productosFavoritos.splice(index, 1);
                console.log("Producto removido de favoritos:", producto);
            } else {
                this.productosFavoritos.push(producto);
                console.log("Producto agregado a favoritos:", producto);
            }
        },
        eliminarDeFavoritos(id) {
            this.productosFavoritos = this.productosFavoritos.filter(item => item.id !== id);
        }

    },

});

