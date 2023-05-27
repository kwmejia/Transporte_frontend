 
<template>
  <div ref="mapRef" class="googleMap h-100"></div>
</template>

<script setup>
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
  directionsRender.value = new googleMaps.value.DirectionsRenderer({
    polylineOptions: { strokeColor: "#2A2949" },
  });

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
    icon: {
      url: "https://cdn-icons-png.flaticon.com/512/6009/6009864.png",
      scaledSize: new googleMaps.value.Size(50, 50),
    },
  });
}

function drawRoute(start_lat, start_lng, end_lat, end_lng) {
  const start = new googleMaps.value.LatLng(
    parseFloat(start_lat),
    parseFloat(start_lng)
  );
  const end = new googleMaps.value.LatLng(
    parseFloat(end_lat),
    parseFloat(end_lng)
  );
  const request = {
    origin: start,
    destination: end,
    travelMode: googleMaps.value.TravelMode.DRIVING,
  };
  directionsService.value.route(request, function (response) {
    directionsRender.value.setDirections(response);
    directionsRender.value.setMap(map.value);
    directionsRender.value.setOptions({ suppressMarkers: false });
  });
}

function setMarket(coordinates) {
  marker.value = new googleMaps.value.Marker({
    position: coordinates,
    map: map.value,
    animation: googleMaps.value.Animation.DROP,
  });
}
function markertsCustom(marketsCustomers) {
  markers.value.forEach((element) => {
    element.visible = false;
  });
  marketsCustomers.forEach((el) => {
    const marker = new googleMaps.value.Marker({
      position: {
        lat: parseFloat(el.cus_latitude),
        lng: parseFloat(el.cus_altitude),
      },
      map: map.value,
      animation: googleMaps.value.Animation.DROP,
      icon: {
        url: "https://cdn-icons-png.flaticon.com/512/6009/6009864.png",
        scaledSize: new googleMaps.value.Size(30, 30),
      },
    });
    if (!props.showInfoWindow) {
      const infoWindow = new googleMaps.value.InfoWindow({
        maxWidth: 500,
        content: el.cus_name,
      });
      marker.addListener("mouseover", () => {
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
  // markers.value.push(marker);
}

function setStyle(style) {
  map.value.setOptions({ styles: styleList[style] });
}

defineExpose({
  initializeGoogleMaps,
  markertsCustom,
  setUbication,
  createMarket,
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
  border-radius: 20px;
  border: 4px solid var(--blue2);
}
p {
  user-select: none;
}
</style>