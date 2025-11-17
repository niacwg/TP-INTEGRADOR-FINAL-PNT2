<template>
  <div class="producto-individual">
    <div v-if="loading" class="loading">Cargando producto...</div>
    <div v-else-if="!producto" class="error">Producto no encontrado</div>

    <div v-else class="producto-detalle">
      <div class="producto-imagen">
        <img :src="producto.image" :alt="producto.title" />
      </div>

      <div class="producto-info">
        <h1>{{ producto.title }}</h1>
        <p class="categoria">Categoría: {{ producto.category }}</p>
        <p class="descripcion">{{ producto.description }}</p>
        <p class="precio">${{ producto.price.toLocaleString('es-AR') }}</p>

        <div class="quantity-fav">
          <div class="quantity-controls">
            <button class="btn-quantity" @click="globalStore.eliminarProducto(producto.id)">-</button>
            <span class="quantity-input">{{ globalStore.getCantidadProducto(producto.id) }}</span>
            <button class="btn-quantity" @click="globalStore.agregarProducto(producto)">+</button>
          </div>
          <button
            class="btn-favorite"
            :title="globalStore.esFavorito(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
            @click="globalStore.toggleFavorito(producto)"
          >
            <i
              class="bi"
              :class="globalStore.esFavorito(producto.id) ? 'bi-heart-fill heart-active' : 'bi-heart'"
            ></i>
          </button>
        </div>

        <button class="btn-volver" @click="volverAtras">Volver</button>
      </div>
    </div>
  </div>
</template>

<script>
import ServicioProductos from '@/servicios/productos'
import { useGlobalStore } from '@/estadoGlobal/global'

const servicio = new ServicioProductos()

export default {
  name: 'ProductoIndividual',
  data(){ return { producto:null,
     loading:true,
     globalStore: useGlobalStore()
     } },
  methods:{
    volverAtras(){ this.$router.go(-1) },
    async cargarProducto(){
      this.loading = true
      this.producto = await servicio.getById(this.$route.params.id)
      this.loading = false
    }
  },
  mounted(){ this.cargarProducto() }
}
</script>

<style scoped>
/* Contenedor general de la vista */
.producto-individual{
  max-width:1200px;
  margin:0 auto;
  padding:20px 20px 40px;     
  background:#f8f9fa;
  border-radius:16px;
}

/* Card del producto */
.producto-detalle{
  display:grid;
  grid-template-columns:360px 1fr; 
  gap:24px;
  align-items:center;             
  padding:20px 24px;              
  background:#f5f5f5;
  border-radius:12px;
  box-shadow:0 2px 6px rgba(0,0,0,.05);
}

/* Imagen */
.producto-imagen{
  display:flex;
  align-items:center;
  justify-content:center;
}
.producto-imagen img{
  max-width:300px;
  max-height:340px;
  width:100%;
  height:auto;
  object-fit:contain;
  border-radius:8px;
}

/* Bloque de info */
.producto-info{
  padding:4px 16px 0;            
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
}
.categoria{ color:#666; margin-bottom:10px; }
.descripcion{
  line-height:1.5;
  margin-bottom:16px;
  max-width:600px;
  text-align:justify;
  color:#000;
}
.precio{
  font-size:24px;
  font-weight:700;
  color:#42b983;
  margin-bottom:16px;
}

.quantity-fav{
  display:flex;
  align-items:center;  
  gap:12px;
  margin-bottom:20px;
}

/* Control de cantidad */
.quantity-controls{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height:36px;                 
  border:1px solid #ddd;
  border-radius:6px;
  padding:0 10px;              
  background:#fff;
  gap:10px;
}
.btn-quantity{
  border:none;
  background:none;
  height:36px;                 
  display:flex;
  align-items:center;
  padding:0 6px;
  cursor:pointer;
  color:#555;
  font-size:16px;
  font-weight:500;
  line-height:1;               
}
.quantity-input{
  min-width:28px;
  text-align:center;
  font-size:15px;
  font-weight:500;
  line-height:36px;            
}

/* Botón corazón */
.btn-favorite{
  background:#fff;
  border:1px solid #ddd;
  border-radius:6px;
  height:36px;
  width:36px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  padding:0;
}
.btn-favorite .bi-heart,
.btn-favorite .bi-heart-fill{ font-size:18px; }
.btn-favorite .bi-heart{ color:#666; }
.btn-favorite .bi-heart-fill.heart-active{ color:#dc3545; }
.btn-favorite:hover .bi-heart{ color:#dc3545; }

/* Botón volver */
.btn-volver{
  background:#0d6efd;
  color:#fff;
  border:none;
  padding:10px 26px;
  border-radius:4px;
  cursor:pointer;
}
.btn-volver:hover{ background:#1570d1; }

/* Estados */
.loading,.error{ text-align:center; padding:40px; font-size:18px; }

/* Responsive */
@media (max-width:768px){
  .producto-detalle{ grid-template-columns:1fr; }
  .producto-imagen{ margin-bottom:16px; }
}
</style>
