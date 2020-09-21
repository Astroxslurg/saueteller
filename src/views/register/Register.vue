<template>
  <div class="register">
    <h1>Her kan du registrere sauer</h1>
    <v-text-field
      v-model.number="totalSheep"
      label="Antall sauer"
      type="number">
    </v-text-field>

    <Colors />

    <v-btn @click="changeLocation">
      {{`${registerLocation ? 'Endre' : 'Velg'} lokasjon`}}
    </v-btn>
  </div>
</template>

<script>
import { VTextField, VBtn } from 'vuetify/lib';
import Colors from './Colors.vue';

export default {
  name: 'Register',
  components: {
    VTextField,
    VBtn,
    Colors,
  },
  data() { return {
    sheeps: 0,
  }},
  computed: {
    totalSheep: {
      get() {
        return this.$store.getters['register/totalSheep'];
      },
      set(newTotal) {
        this.$store.commit('register/setTotalSheep', newTotal);
      },
    },
    colors: {
      get() { return this.$store.getters['register/getColors']; },
    },
    registerLocation: {
      get() {
        return this.$route.params.registerLocation;
      },
    },
  },
  methods: {
    changeLocation() {
      console.log(this.registerLocation);
    },
  },
};
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
