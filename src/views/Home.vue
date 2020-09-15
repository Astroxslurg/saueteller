<template>
  <div class="home">
    <Leaflet />
  </div>
</template>

<script>
// @ is an alias to /src
import Leaflet from '@/components/Leaflet.vue'

export default {
  name: 'Home',
  components: {
    Leaflet
  }
}
</script>
