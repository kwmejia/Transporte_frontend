<template>
  <section class="container">
    <h2 class="text-center my-4">Actualizar Ruta</h2>
    <button class="btn btn-warning my-3" @click="goToRouterPage">
      {{ "< Regresar" }}
    </button>
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-center">
        <div class="w-100" v-if="!loadingRequestMounted">
          <div class="inputBox mb-3 d-flex w-100">
            <input
              type="text"
              name="name_product"
              required
              v-model="codeRoute"
            />
            <span>Codigo de la ruta</span>
          </div>
          <div class="inputBox mb-3 d-flex w-100">
            <input
              type="text"
              name="name_product"
              required
              v-model="nameRoute"
            />
            <span>Nombre de la ruta</span>
          </div>
        </div>
        <div v-else class="spinner-border text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <button class="btn btn-success" @click="updateRoute">
          <span v-if="!loadingRequest">Actualizar</span>
          <div v-else class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { showAlertError, showAlertSuccess } from "@/helpers/alerts.js";
import { baseURL } from "@/api/configAxios.js";
import { useRouter, useRoute } from "vue-router";
import clientHTTP from "@/api/configAxios.js";

const router = useRouter();
const route = useRoute();
let codeRoute = ref("");
let nameRoute = ref("");
let loadingRequest = ref(false);
let loadingRequestMounted = ref(false);

onMounted(() => {
  getInfoRoute();
});

const getInfoRoute = async () => {
  try {
    loadingRequestMounted.value = true;
    const resp = await clientHTTP.get(`${baseURL}/routes/${route.params.id}`);
    if (resp.data.data.length < 0) {
      router.push({ name: "routes" });
      return;
    }
    loadingRequestMounted.value = false;
    codeRoute.value = resp.data.data[0].rou_code;
    nameRoute.value = resp.data.data[0].rou_name;
  } catch (error) {
    showAlertError();
    router.push({ name: "routes" });
  }
};

const updateRoute = async () => {
  if ([codeRoute.value, nameRoute.value].includes("")) {
    showAlertError("Todos los campos son obligatorios");
    return;
  }

  try {
    loadingRequest.value = true;
    await clientHTTP.put(`${baseURL}/routes`, {
      id: route.params.id,
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