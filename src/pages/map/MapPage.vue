<template>
  <h1>Mapa</h1>
  <section class="container">
    <div class="row">
      <div class="col-8">
        <GoogleMaps ref="mapa" />
      </div>
      <div class="col-4">
        <div class="">
          <div class="inputBox mb-3 d-flex w-100">
            <select
              name="category"
              class="form-control"
              v-model="customerSelected"
            >
              <option selected disabled value="">Elige una ruta</option>
              <option
                v-for="customer in listCustomers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.cus_name }}
              </option>
            </select>
          </div>
          <button @click="printRoute">pintar</button>
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
const customerSelected = ref("");
onMounted(() => {
  getAllCustomers();
});

let listCustomers = ref([]);
async function getAllCustomers() {
  try {
    const resp = await clientHTTP.get(`${baseURL}/customers`);
    listCustomers.value = await resp.data.data;
  } catch (error) {
    showAlertError();
  }
}

function printRoute() {
  // mapa.value.setUbication({ lat: 7.0960826, lng: -73.116223 });
  // mapa.value.createMarket({ lat: 7.1093686086817796, lng: -73.11941380922316 });
  mapa.value.drawRoute();
}
</script>

<style>
</style>