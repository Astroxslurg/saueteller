import Vue from 'vue';
import Vuex from 'vuex';

import register from './register';
import map from './map';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    map,
    register,
  },
});
