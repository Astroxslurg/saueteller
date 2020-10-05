<template>
  <div class="lambs">
    <h1>Her kan du registrere lam</h1>
    <VBtn @click="click" >Registrer lam</VBtn>
  </div>
</template>

<script>
import { VTextField, VBtn } from 'vuetify/lib';
import Colors from './Colors.vue';

export default {
  name: 'Register',
  components: {
    VBtn,
  },
  data() {
    return {
    };
  },
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
    lambs: {
      get() { return this.$store.state.register.lambs; },
    },
    registerLocation: {
      get() {
        return this.$route.params.registerLocation;
      },
    },
  },
  methods: {
    click() {
      alert('Du er lam!');
    },
  },
};
</script>

<style lang="css" scoped>
.lambs {
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
