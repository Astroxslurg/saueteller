<template>
  <div id="app">
    <Leaflet />
  </div>
</template>

<script>
import Leaflet from './components/Leaflet'
export default {
  name: 'App',
  components: {
    Leaflet,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
