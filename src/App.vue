<template>
  <div id="app">
    <h1>Formulario de pago</h1>
    <CheckoutView />
  </div>
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
  text-align: center;
  padding: 2rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
