<template>
  <div style="height: 500px; width: 100%">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
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
import { latLng, latLngBounds } from "leaflet";
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
    };
  },
  methods: {
    whenReady(tileLayerObject) {
        this.tileLayerObject = tileLayerObject;
        let corner1 = latLng(69.5, 19.0);
        let corner2 = latLng(70.0, 19.5)
        let bounds = latLngBounds(corner1, corner2);
        this.tileLayerObject.seed(bounds, 8, 12);
        // console.log(bounds)
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
