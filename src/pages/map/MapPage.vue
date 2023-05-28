<template>
  <h1 class="text-center my-4">Mapa</h1>
  <section class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <GoogleMaps ref="mapa" />
      </div>
      <div class="col-12 col-md-4">
        <div class="d-flex flex-wrap justify-content-center">
          <div class="inputBox mb-3 d-flex w-100">
            <select
              name="category"
              class="form-control"
              v-model="routeId"
              required
            >
              <option selected disabled value="">Elige una ruta</option>
              <option
                v-for="route in listRoutes"
                :key="route.id"
                :value="route.id"
              >
                {{ route.rou_name }}
              </option>
            </select>
          </div>
          <button @click="printRoute" class="succes-btn">Buscar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import clientHTTP, { baseURL } from "@/api/configAxios";
import { showAlertError } from "@/helpers/alerts";
import GoogleMaps from "@/pages/map/GoogleMaps.vue";
import { onMounted, ref } from "vue";
const mapa = ref();
const routeId = ref("");
const listRoutes = ref([]);
const listCustomers = ref();

onMounted(() => {
  getAllRoutes();
});

async function getAllRoutes() {
  try {
    const resp = await clientHTTP.get(`${baseURL}/routes`);
    listRoutes.value = await resp.data.data;

    const response = await clientHTTP.get(`${baseURL}/customers`);
    listCustomers.value = await response.data.data;
  } catch (error) {
    showAlertError();
  }
}

function printRoute() {
  if (routeId.value == "") {
    showAlertError("Escoge una ruta");
    return;
  }

  let route = listRoutes.value;
  route = route.filter((route) => route.id == routeId.value);

  const customersByroute = listCustomers.value.filter(
    (customer) => customer.routes_rou_id == routeId.value
  );
  mapa.value.markertsCustom(customersByroute);
  const { start_lat, start_lng, end_lat, end_lng } = route[0];
  mapa.value.drawRoute(start_lat, start_lng, end_lat, end_lng);

  // mapa.value.setUbication({ lat: 7.0960826, lng: -73.116223 });
  // mapa.value.createMarket({ lat: 7.1093686086817796, lng: -73.11941380922316 });
}
</script>

<style>
</style>