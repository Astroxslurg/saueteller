import { latLng } from "leaflet";

export default {
  namespaced: true,
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
  getters: {
  },
};