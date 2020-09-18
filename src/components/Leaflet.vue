<template>
  <div style="height: 100vh; width: 100vw">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="setCenter"
      @update:zoom="setZoom"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :options="{useCache: true}"
        @ready="whenReady"
      /> 
    </l-map>
  </div>
</template>

<script>
import { latLng, latLngBounds, polyline, circle } from 'leaflet';
import { LMap, LTileLayer } from 'vue2-leaflet';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Leaflet',
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
      attribution:
        '<a href="http://www.kartverket.no/">Kartverket</a>',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      tileLayerObject: undefined,
      map: undefined,
      polylineLayer: undefined,
      registerLocationCircle: undefined,
    };
  },
  computed: {
    ...mapState(['zoom', 'center', 'visitedPositions', 'registerLocation', 'firstLoad',]),
  },
  methods: {
    ...mapMutations(['setZoom', 'setCenter', 'addVisitedLocation', 'setRegisterLocation', 'hasLoaded']),
    onMapTap(mouseEvent) {
      this.setRegisterLocation(mouseEvent.latlng);
      console.log(`Clicked at ${this.registerLocation.toString()} `);
      if (this.registerLocationCircle) {
        this.registerLocationCircle.setLatLng(this.registerLocation);
      } else {
        this.registerLocationCircle = circle(this.registerLocation, {radius: 150, color: 'blue'}).addTo(this.map);
      }
      window.setTimeout(() => {
        this.$router.push('register')
      }, 350);
    },
    deviceReady() {
      console.log("Device is ready!");
      navigator.geolocation.getCurrentPosition(this.onFirstPosition, this.onPositionError);
    },
    whenReady(tileLayerObject) {
      this.tileLayerObject = tileLayerObject;
      this.map = this.$refs.map.mapObject;

      this.map.on('click', this.onMapTap);

      if (this.firstLoad) {
        document.addEventListener('deviceready', this.deviceReady, false);
        this.hasLoaded();
      } else {
        this.redrawFromState();
      }
    },
    redrawFromState() {
      if (this.registerLocation) {
        this.registerLocationCircle = circle(this.registerLocation, {radius: 150, color: 'blue'}).addTo(this.map);
      }
      if (this.visitedPositions.length) {
        this.polylineLayer = polyline(this.visitedPositions, {color: 'blue'}).addTo(this.map);
      }
    },
    onPositionError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    },
    onPosition(position) {
      const pos = [position.coords.latitude, position.coords.longitude]
      this.map.flyTo(new latLng(...pos), this.zoom);
      this.addVisitedLocation(pos);
      return pos;
    },
    onNewPosition(position) {
      this.onPosition(position);
      this.polylineLayer.setLatLngs(this.visitedPositions);
    },
    onFirstPosition(position) {
      this.onPosition(position);
      this.polylineLayer = polyline(this.visitedPositions, {color: 'blue'}).addTo(this.map);
      navigator.geolocation.watchPosition(this.onNewPosition, this.onPositionError);
    },
    seedArea(x1, y1, x2, y2, zoomMin, zoomMax) {
      let corner1 = latLng(x1, y1);
      let corner2 = latLng(x2, y2);
      let bounds = latLngBounds(corner1, corner2);
      this.tileLayerObject.seed(bounds, zoomMin, zoomMax);
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
  }
};
</script>
