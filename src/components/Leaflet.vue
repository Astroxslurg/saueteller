<template>
  <div style="height: 100vh; width: 100vw">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
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
import { latLng, latLngBounds, polyline } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "Leaflet",
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 11,
      center: latLng(60.14, 10.25),
      url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
      attribution:
        '<a href="http://www.kartverket.no/">Kartverket</a>',
      currentZoom: 11.5,
      currentCenter: latLng(60.14, 10.25),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      tileLayerObject: undefined,
      map: undefined,
      polylineLayer: undefined,
      visitedPositions: [],
      clickedLocation: latLng(0,0),
    };
  },
  methods: {
    onMapTap(mouseEvent) {
      this.clickedLocation = mouseEvent.latlng;
      console.log(`Clicked at ${this.clickedLocation.toString()} `);
      // this.map.flyTo(mouseEvent.latlng, this.currentZoom);
      this.$router.push('register')
    },
    deviceReady() {
      console.log("Device is ready!");
    },
    whenReady(tileLayerObject) {
      this.tileLayerObject = tileLayerObject;
      this.map = this.$refs.map.mapObject;

      this.map.on('click', this.onMapTap);

      document.addEventListener('deviceready', this.deviceReady, false);
      // navigator.geolocation.getCurrentPosition(this.onFirstPosition, this.onPositionError);
    },
    onPositionError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    },
    onPosition(position) {
      const pos = [position.coords.latitude, position.coords.longitude]
      this.map.flyTo(new latLng(...pos), this.currentZoom);
      this.visitedPositions.push(pos)
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
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
  }
};
</script>
