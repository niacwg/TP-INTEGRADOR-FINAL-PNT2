<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos-favoritos">Favoritos</router-link>
          </li>
        </ul>
        <!-- Ícono de carrito de compras alineado a la derecha -->
        <router-link class="nav-link ms-auto position-relative" to="/carro-de-compras">
          <i class="bi bi-cart fs-4"></i>
          <span v-if="globalStore.totalItems > 0" class="badge rounded-pill bg-danger cart-badge">
            {{ globalStore.totalItems }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>

import { useGlobalStore } from '@/estadoGlobal/global';
export default {
  name: 'NavBar',

  setup() {
    const globalStore = useGlobalStore();
    return { globalStore };
  }
}
</script>

<style scoped>
.nav-color {
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.nav-link {
  color: white;
  /* Color inicial */
  transition: color 0.3s ease;
  /* Animación suave */
}

.nav-link:hover {
  color: #004896;
  /* Color al hacer hover */
  text-decoration: underline;
}
</style>