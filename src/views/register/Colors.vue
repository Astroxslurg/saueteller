<template>
  <div class="colors"
    :style="{
      borderStyle: notInSync ? 'solid' : 'unset',
    }">
    <v-text-field
      v-model.number="white"
      label="Antall hvite sauer"
      type="number"
      min="0">
    </v-text-field>
    <v-text-field
      v-model.number="black"
      label="Antall sorte sauer"
      type="number"
      min="0">
    </v-text-field>
    <v-text-field
      v-model.number="brown"
      label="Antall brune sauer"
      type="number"
      min="0">
    </v-text-field>
    <v-text-field
      v-model.number="unspecified"
      label="Antall uspesifiserte sauer"
      type="number"
      min="0">
    </v-text-field>
  </div>    
</template>

<script>
import { VTextField } from 'vuetify/lib';

export default {
  name: 'Colors',
  components: {
    VTextField,
  },
  computed: {
    white: {
        get() { return this.$store.state.register.colors.white; },
        set(count) { this.$store.commit('register/setColorCount', { color: 'white', count }); },
    },
    black: {
        get() { return this.$store.state.register.colors.black; },
        set(count) { this.$store.commit('register/setColorCount', { color: 'black', count }); },
    },
    brown: {
        get() { return this.$store.state.register.colors.brown; },
        set(count) { this.$store.commit('register/setColorCount', { color: 'brown', count }); },
    },
    unspecified: {
        get() { return this.$store.state.register.colors.unspecified; },
        set(count) { this.$store.commit('register/setColorCount', { color: 'unspecified', count }); },
    },
    notInSync: {
        get() { return this.$store.state.register.colors.notInSync; },
        set() { },
    },
  },
};
</script>

<style lang="css" scoped>
.colors {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  justify-content: center;
  align-content: center;
  border-color: #f44336;
  border-width: 3px;
  border-radius: 5px;
}
</style>