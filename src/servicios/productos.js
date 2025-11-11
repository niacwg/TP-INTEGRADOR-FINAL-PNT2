import axios from "axios";

class ServicioProductos {
    #url

    constructor() {
        this.#url = 'https://fakestoreapi.com/products'
    }

    getAll = async () => {

        try {
            const { data:productos } = await axios.get(this.#url)      // Object Destructuring con alias
            console.log(productos)
            return productos
        }
        catch(error) {
            console.error('Error GET productos', error)
            return []
        }
    }

    post = async producto => {
        try {
            const { data:productoGuardado } = await axios.post(this.#url, producto)
            return productoGuardado
        }
        catch(error) {
            console.error('Error POST producto', error)
            return {}
        }
    }

    put = async (id, producto) => {
        try {
            const { data:productoActualizado } = await axios.put(this.#url+id, producto)
            return productoActualizado
        }
        catch(error) {
            console.error('Error POST producto', error)
            return {}
        }
    }

    delete = async id => {
        try {
            const { data:productoEliminado } = await axios.delete(this.#url+id)
            return productoEliminado
        }
        catch(error) {
            console.error('Error DELETE producto', error)
            return {}
        }
    }
}

export default ServicioProductos