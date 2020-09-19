<template>
  <div class="register">
    <h1>Her kan du registrere sauer</h1>
    <v-text-field
      v-model.number="sheeps"
      label="Antall sauer"
      type="number">
    </v-text-field>
  </div>
</template>

<script>
import { VTextField } from 'vuetify/lib'

export default {
  name: 'Register',
  components: {
    VTextField,
  },
  data() { return {
    sheeps: 0,
  }},
}
</script>

<style lang="css" scoped>
.register {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: min(max-content, 1fr);
  grid-auto-flow: row;
  justify-content: center;
  align-content: center;
  padding: 10px 5vw;
}
</style>
