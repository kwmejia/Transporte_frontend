<template>
  <section class="container">
    <h2 class="text-center my-4 text-secc">Nuevo Cliente</h2>
    <button class="btn my-3 btn-back text-succ" @click="goToCustomerPage">
      <i class="fas fa-long-arrow-alt-left"></i>
      {{ "Regresar" }}
    </button>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="name" />
          <span>Nombres</span>
        </div>
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="lastname" />
          <span>Apellidos</span>
        </div>
        <div class="inputBox mb-3 d-flex w-100">
          <input
            type="text"
            name="name_product"
            maxlength="10"
            required
            v-model="nit"
          />
          <span>Identificacion</span>
        </div>

        <div class="inputBox mb-3 d-flex w-100">
          <input
            type="tel"
            name="name_product"
            maxlength="10"
            required
            v-model="phone"
          />
          <span>Telefono</span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="latitude" />
          <span>Latitud</span>
        </div>
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="altitude" />
          <span>Altitud</span>
        </div>

        <div class="inputBox mb-3 d-flex w-100">
          <select
            name="category"
            class="form-control"
            v-model="routeId"
            required
          >
            <option selected disabled value="">Ruta</option>
            <option
              v-for="route in listRoutes"
              :key="route.id"
              :value="route.id"
            >
              {{ route.rou_name }}
            </option>
          </select>
        </div>
      </div>

      <button class="succes-btn" @click="insertCustomer">
        <span v-if="!loadingRequest">Agregar</span>
        <div v-else class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { showAlertError, showAlertSuccess } from "@/helpers/alerts.js";
import { baseURL } from "@/api/configAxios.js";
import { useRouter } from "vue-router";
import clientHTTP from "@/api/configAxios.js";

const router = useRouter();

let listRoutes = ref("");
let name = ref("");
let lastname = ref("");
let nit = ref("");
let phone = ref("");
let latitude = ref("");
let altitude = ref("");
let routeId = ref("");

let loadingRequest = ref(false);

onMounted(() => {
  getAllRoutes();
});

async function getAllRoutes() {
  try {
    const resp = await clientHTTP.get(`${baseURL}/routes`);
    listRoutes.value = await resp.data.data;
  } catch (error) {
    showAlertError();
  }
}

const insertCustomer = async () => {
  if (
    [
      name.value,
      lastname.value,
      nit.value,
      phone.value,
      latitude.value,
      altitude.value,
      routeId.value,
    ].includes("")
  ) {
    showAlertError("Todos los campos son obligatorios");
    return;
  }

  try {
    loadingRequest.value = true;
    await clientHTTP.post(`${baseURL}/customers`, {
      name: name.value,
      lastname: lastname.value,
      nit: nit.value,
      phone: phone.value,
      latitude: latitude.value,
      altitude: altitude.value,
      routeId: routeId.value,
    });
    loadingRequest.value = false;
    showAlertSuccess();
  } catch (error) {
    showAlertError();
  } finally {
    goToCustomerPage();
  }
};

const goToCustomerPage = () => {
  router.push({ name: "customers" });
};
</script>

<style>
.btn-back {
  border: none;
  background: transparent;
}
.succes-btn {
  width: min-content;
  margin: 0 auto;
}
</style>