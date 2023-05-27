 
<template>
  <div ref="mapRef" class="googleMap h-100"></div>
</template>

<script setup>
/* eslint-disable */
import {
  ref,
  onBeforeMount,
  defineProps,
  defineExpose,
  defineEmits,
} from "vue";
import { initialGoogleMaps } from "@/utils/google-maps.js";
import { styleList } from "@/assets/stylesMap.js";
const props = defineProps({
  centralCoordinates: {
    type: Object,
    required: false,
    default: () => ({ lat: 7.1093686086817796, lng: -73.11941380922316 }),
  },
  showInfoWindow: {
    type: Boolean,
    required: false,
    default: false,
  },
  constructorInfoWindow: {
    type: Function,
    required: false,
    default: () => {
      "";
    },
  },
  disabledControls: {
    type: Boolean,
    required: false,
    default: false,
  },
  radiusPointHeat: {
    type: Number,
    required: false,
    default: 2,
  },
});

const mapRef = ref();
const googleMaps = ref();
const map = ref();
const markers = ref([]);
const polygon = ref();
const headMap = ref();
const coordinatesPolygon = ref([]);
const emit = defineEmits(["loaded"]);
const geocoder = ref();
const marker = ref();
const directionsService = ref();
const directionsRender = ref();

onBeforeMount(() => {
  initializeGoogleMaps();
});

async function initializeGoogleMaps() {
  googleMaps.value = await initialGoogleMaps();
  geocoder.value = new googleMaps.value.Geocoder();
  directionsService.value = new googleMaps.value.DirectionsService();
  directionsRender.value = new googleMaps.value.DirectionsRenderer();

  map.value = new googleMaps.value.Map(mapRef.value, {
    zoom: 14,
    center: props.centralCoordinates,
    disableDefaultUI: props.disabledControls,
    scrollwheel: true,
  });
  emit("loaded");
}

function setUbication(coordinates) {
  map.value.setCenter(coordinates);
  marker.value
    ? marker.value.setPosition(coordinates)
    : createMarket(coordinates);
}
function createMarket(coordinates) {
  marker.value = new googleMaps.value.Marker({
    position: coordinates,
    map: map.value,
  });
}

function drawRoute() {
  const start = new googleMaps.value.LatLng(7.0960826, -73.116223);
  const end = new googleMaps.value.LatLng(
    7.1093686086817796,
    -73.11941380922316
  );
  const request = {
    origin: start,
    destination: end,
    travelMode: googleMaps.value.TravelMode.DRIVING,
  };
  directionsService.value.route(request, function (response, status) {
    directionsRender.value.setDirections(response);
    directionsRender.value.setMap(map.value);
    directionsRender.value.setOptions({ suppressMarkers: false });
    console.log(response, status);
  });
}

function setMarket(coordinates) {
  marker.value = new googleMaps.value.Marker({
    position: coordinates,
    map: map.value,
    animation: googleMaps.value.Animation.DROP,
  });
}
function marketsCustom(marketsRestaurants) {
  marketsRestaurants.forEach((el) => {
    const marker = new googleMaps.value.Marker({
      position: el.coordenadas,
      map: map.value,
      animation: googleMaps.value.Animation.DROP,
      icon: {
        url: el.fotoLogoMini || el.fotoLogo,
        scaledSize: new googleMaps.value.Size(30, 30),
      },
    });
    if (props.showInfoWindow) {
      const infoWindow = new googleMaps.value.InfoWindow({
        maxWidth: 500,
        content: props.constructorInfoWindow(el),
      });
      marker.addListener("mouseover", (event) => {
        infoWindow.open({
          anchor: marker,
          map: map.value,
        });
      });
      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
    }
    markers.value.push(marker);
  });
}
function createPolygon() {
  polygon.value = new googleMaps.value.Polygon({
    strokeColor: "#344563",
    strokeOpacity: 1,
    strokeWeight: 3,
    editable: true,
    draggable: true,
    map: map.value,
  });
  googleMaps.value.event.addListener(map.value, "click", (event) => {
    coordinatesPolygon.value = polygon.value.getPath();
    coordinatesPolygon.value.push(event.latLng);
  });
}
function getCoordinatesPolygon() {
  let coordinates = [];
  const vertices = polygon.value.getPath();
  vertices.forEach((el) => {
    coordinates.push({ lat: el.lat(), lng: el.lng() });
  });
  return coordinates;
}
function drawPolygon(geocercas) {
  for (const geo of geocercas) {
    const puntos = geo.puntos.map(function (p) {
      p.lat = parseFloat(p.lat);
      p.lng = parseFloat(p.lng);
      return p;
    });
    const polygon = new googleMaps.value.Polygon({
      paths: puntos,
      strokeColor: "#344563",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#344563",
      fillOpacity: 0.35,
      map: map.value,
    });
    const infoWindow = new googleMaps.value.InfoWindow();
    polygon.addListener("click", (event) => {
      if (!geo.nombre) return;
      infoWindow.setContent(`
				<p class="m-2">${geo.nombre}</p>
			`);
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map.value);
    });
    polygon.addListener("mouseout", () => {
      infoWindow.close();
    });
  }
}
function drawHeadMap(coordinates) {
  headMap.value = new googleMaps.value.visualization.HeatmapLayer({
    data: getPoints(coordinates),
    map: map.value,
  });
  headMap.value.set("radius", props.radiusPointHeat);
}
function getPoints(coordinates) {
  return coordinates.map(
    (el) => (el = new googleMaps.value.LatLng(el.lat, el.lng))
  );
}
function setStyle(style) {
  map.value.setOptions({ styles: styleList[style] });
}
function geocodePlaceId(placeId) {
  const geocoder = new googleMaps.value.Geocoder();
  return new Promise((resolve) => {
    geocoder.geocode({ placeId }).then(({ results }) => {
      resolve({
        coordinates: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        },
        address: results[0].formatted_address,
      });
    });
  });
}

defineExpose({
  getCoordinatesPolygon,
  initializeGoogleMaps,
  geocodePlaceId,
  marketsCustom,
  createPolygon,
  setUbication,
  createMarket,
  drawPolygon,
  drawHeadMap,
  setMarket,
  setStyle,
  drawRoute,
});
</script>

<style>
.googleMap {
  position: relative;
  width: 100%;
  height: 60vh !important;
}
p {
  user-select: none;
}
</style>