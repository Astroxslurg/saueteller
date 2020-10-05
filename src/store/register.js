import Vue from 'vue';

const getters = {
  totalSheep(state) {
    return Object.values(state.colors).reduce((acc, el) => ((typeof el === 'number') ? acc + el : acc), 0);
  },
  getColors(state) {
    return { ...state.colors };
  },
};

export default {
  namespaced: true,
  state: {
    colors: {
      white: 0,
      black: 0,
      brown: 0,
      unspecified: 0,
      notInSync: false,
    },
    lambs: 0,
  },

  mutations: {
    setTotalSheep(state, newTotal) {
      const sheepDiff = newTotal - getters.totalSheep(state);
      state.colors.unspecified += sheepDiff;
      if (state.colors.unspecified < 0) {
        state.colors.notInSync = true;
      } else {
        state.colors.notInSync = false;
      }
    },
    setColorCount(state, { color, count }) {
      if (count < 0) { return; }
      if (state.colors.unspecified < 0) {
        const diff = count - state.colors[color];
        if (diff < 0) {
          Vue.set(state.colors, 'unspecified', state.colors.unspecified - diff);
        }
      }

      Vue.set(state.colors, color, count);
      if (state.colors.unspecified >= 0) {
        Vue.set(state.colors, 'notInSync', false);
      }
    },
  },
  actions: {
  },

  getters: {
    ...getters,
  },
};
