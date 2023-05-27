<template>
  <section class="container">
    <h2 class="text-center my-4">Nueva Ruta</h2>
    <button class="btn btn-warning my-3" @click="goToRouterPage">
      {{ "< Regresar" }}
    </button>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="codeRoute" />
          <span>Codigo de la ruta</span>
        </div>
        <div class="inputBox mb-3 d-flex w-100">
          <input type="text" name="name_product" required v-model="nameRoute" />
          <span>Nombre de la ruta</span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <button class="btn btn-success" @click="insertRoute">
          <span v-if="!loadingRequest">Agregar</span>
          <div v-else class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { showAlertError, showAlertSuccess } from "@/helpers/alerts.js";
import { baseURL } from "@/api/configAxios.js";
import { useRouter } from "vue-router";
import clientHTTP from "@/api/configAxios.js";

const router = useRouter();

let codeRoute = ref("");
let nameRoute = ref("");
let loadingRequest = ref(false);

const insertRoute = async () => {
  if ([codeRoute.value, nameRoute.value].includes("")) {
    showAlertError("Todos los campos son obligatorios");
    return;
  }

  try {
    loadingRequest.value = true;
    await clientHTTP.post(`${baseURL}/routes`, {
      code: codeRoute.value,
      name: nameRoute.value,
    });
    loadingRequest.value = false;
    showAlertSuccess();
  } catch (error) {
    showAlertError();
  } finally {
    router.push({ name: "routes" });
  }
};

const goToRouterPage = () => {
  router.push({ name: "routes" });
};
</script>

<style>
</style>