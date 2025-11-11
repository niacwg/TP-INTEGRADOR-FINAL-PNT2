<template>
<<<<<<< HEAD
  <NavBar />
=======
  <div id="app">
    <h1>Formulario de pago</h1>
    <CheckoutView />
  </div>
>>>>>>> 3b75ae1be3c3211a62a7d35d8dc0d7bdf0deb2b2
</template>

<script>
import CheckoutView from './views/CheckoutView.vue'

export default {
  name: 'App',
  components: { CheckoutView }
}
</script>

<style>
#app {
<<<<<<< HEAD
  font-family: "Stack Sans Text", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

=======
  text-align: center;
  padding: 2rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
>>>>>>> 3b75ae1be3c3211a62a7d35d8dc0d7bdf0deb2b2
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