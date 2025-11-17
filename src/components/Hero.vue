<template>
  <div class="hero-container">
    <div class="hero-section">
      <!-- Flecha izquierda -->
      <button class="hero-nav hero-nav-left" @click="anteriorProducto" aria-label="Producto anterior">
        <i class="bi bi-chevron-left"></i>
      </button>

      <div class="hero-content">
        <!-- Contenido de texto -->
        <div class="hero-text">
          <div class="hero-date">
            {{ fechaActual }}
          </div>
          <h1 class="hero-title">
            {{ tituloOferta }}
          </h1>
          <p class="hero-subtitle">
            {{ descripcionOferta }}
          </p>

        </div>

        <!-- Imagen del producto -->
        <div class="hero-image">
          <div v-if="cargandoProducto" class="loading-placeholder">
            <div class="spinner"></div>
          </div>
          <img 
            v-else-if="productoDestacado" 
            :src="productoDestacado.image" 
            :alt="productoDestacado.title"
          >
        </div>
      </div>

      <!-- Flecha derecha -->
      <button class="hero-nav hero-nav-right" @click="siguienteProducto" aria-label="Producto siguiente">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ServicioProductos from '@/servicios/productos.js'

export default {
  name: 'HeroSection',
  data() {
    return {
      productos: [],
      productoActualIndex: 0,
      cargandoProducto: true,
      intervaloCarousel: null
    }
  },
  computed: {
    productoDestacado() {
      return this.productos.length > 0 ? this.productos[this.productoActualIndex] : null
    },
    fechaActual() {
      const fecha = new Date()
      const opciones = { 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      }
      return fecha.toLocaleDateString('es-ES', opciones)
    },
    tituloOferta() {
      if (!this.productoDestacado) return 'Descubre productos increíbles'
      
      // Personalizar títulos según categoría
      const categoria = this.productoDestacado.category
      switch(categoria) {
        case 'electronics':
          return 'La mejor tecnología al mejor precio'
        case 'jewelery':
          return 'Joyas exclusivas para momentos especiales'
        case "men's clothing":
          return 'Moda masculina de última tendencia'
        case "women's clothing":
          return 'Estilo femenino que marca la diferencia'
        default:
          return 'Productos de calidad excepcional'
      }
    },
    descripcionOferta() {
      if (!this.productoDestacado) return 'Encuentra lo que buscas en nuestra selección premium'
      return `Descubre ${this.productoDestacado.title} y muchos productos más con envío gratuito`
    },
    textoBoton() {
      return 'Ver Productos'
    }
  },
  methods: {
    async cargarProductos() {
      try {
        this.cargandoProducto = true
        const servicio = new ServicioProductos()
        this.productos = await servicio.getAll()
        
        // Mezclar productos para variedad
        this.productos = this.productos.sort(() => 0.5 - Math.random())
      } catch (error) {
        console.error('Error cargando productos para hero:', error)
      } finally {
        this.cargandoProducto = false
      }
    },
    
    siguienteProducto() {
      if (this.productos.length > 0) {
        this.productoActualIndex = (this.productoActualIndex + 1) % this.productos.length
      }
    },
    
    anteriorProducto() {
      if (this.productos.length > 0) {
        this.productoActualIndex = this.productoActualIndex === 0 
          ? this.productos.length - 1 
          : this.productoActualIndex - 1
      }
    },
    
    verTodosProductos() {
      this.$router.push('/productos-generales')
    },
    
    verDetalleProducto(id) {
      this.$router.push(`/producto/${id}`)
    },
    
    iniciarCarouselAutomatico() {
      this.intervaloCarousel = setInterval(() => {
        this.siguienteProducto()
      }, 5000) // Cambiar cada 5 segundos
    },
    
    detenerCarouselAutomatico() {
      if (this.intervaloCarousel) {
        clearInterval(this.intervaloCarousel)
      }
    }
  },
  
  async mounted() {
    await this.cargarProductos()
    this.iniciarCarouselAutomatico()
  },
  
  beforeUnmount() {
    this.detenerCarouselAutomatico()
  }
}
</script>

<style scoped>
.hero-container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.hero-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 400px;
  background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 60px;
}

.hero-text {
  color: white;
  z-index: 2;
}

.hero-date {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
  font-weight: 300;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
  margin-bottom: 30px;
  font-weight: 300;
}

.btn-hero-action {
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-hero-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
}

.hero-image img {
  max-width: 300px;
  max-height: 280px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.05);
}

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 280px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 3;
}

.hero-nav:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.hero-nav-left {
  left: 15px;
}

.hero-nav-right {
  right: 15px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 350px;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 20px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-image img {
    max-width: 200px;
    max-height: 180px;
  }
  
  .hero-nav {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 10px;
  }
  
  .hero-section {
    height: 300px;
    border-radius: 15px;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .btn-hero-action {
    padding: 12px 24px;
    font-size: 14px;
  }
}
</style>
