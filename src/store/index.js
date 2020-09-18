import Vue from 'vue'
import Vuex from 'vuex'
import { latLng } from "leaflet";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      zoom: 11,
      center: latLng(60.14, 10.25),
      visitedPositions: [],
      registerLocation: undefined,
      firstLoad: true,
  },
  mutations: {
    setZoom(state, zoom) {
      state.zoom = zoom;
    },
    setCenter(state, center) {
      state.center = center;
    },
    addVisitedLocation(state, position) {
      state.visitedPositions.push(position);
    },
    setRegisterLocation(state, latLng) {
      state.registerLocation = latLng;
    },
    hasLoaded(state) {
      state.firstLoad = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
