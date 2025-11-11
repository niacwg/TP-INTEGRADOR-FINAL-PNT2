<template>
  <NavBar />
  <!-- Hacer esta parte del codigo funcionar con lo ya hecho, agregar su respectiva vista y router  -->
  <!-- <div id="app">
    <h1>Formulario de pago</h1>
    <CheckoutView />
  </div> -->
</template>

<!-- <script>
import CheckoutView from './views/CheckoutView.vue'

export default {
  name: 'App',
  components: { CheckoutView }
}
</script> -->

<style>
#app {
  font-family: "Stack Sans Text", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* text-align: center;
  padding: 2rem; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>