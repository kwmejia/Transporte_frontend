<template>
  <h1 class="text-center my-4">Rutas</h1>
  <section class="container">
    <div class="mb-4">
      <router-link :to="{ name: 'newRoute' }" class="succes-btn my-4">
        <i class="fas fa-plus me-2"></i>
        <span>Nueva ruta</span>
      </router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Codigo</th>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody v-if="!loadingGetRoutes">
        <tr v-for="(route, index) in listRoutes" :key="route.id">
          <td class="ps-3 fw-bold">{{ index + 1 }}</td>
          <td>{{ route.rou_code }}</td>
          <td>{{ route.rou_name }}</td>
          <td class="d-flex gap-3">
            <button class="btn btn-danger" @click="alertDeleteIdea(route.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button
              class="btn bg-succ btn-delete"
              @click="goToEditRoute(route.id)"
            >
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="loadingGetRoutes"
      class="w-100 d-flex text-light justify-content-center"
    >
      <div class="spinner-border text-light mx-auto my-3" role="status"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { baseURL } from "@/api/configAxios.js";
import clientHTTP from "@/api/configAxios.js";
import { showAlertError, showAlertSuccessToast } from "@/helpers/alerts.js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

let listRoutes = ref([]);
let loadingGetRoutes = ref(false);
const router = useRouter();

onMounted(() => {
  getAllRoutes();
});

async function getAllRoutes() {
  try {
    loadingGetRoutes.value = true;
    const resp = await clientHTTP.get(`${baseURL}/routes`);
    listRoutes.value = await resp.data.data;
    loadingGetRoutes.value = false;
  } catch (error) {
    showAlertError();
  }
}

const alertDeleteIdea = (id) => {
  Swal.fire({
    title: "Estas seguro que quieres eliminar esta ruta?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#0B4A75",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRoute(id);
    }
  });
};

const deleteRoute = async (id) => {
  try {
    await clientHTTP.delete(`${baseURL}/routes?idRoute=${id}`);
    showAlertSuccessToast();
  } catch (error) {
    showAlertError();
  } finally {
    getAllRoutes();
  }
};

const goToEditRoute = (id) => {
  router.push({ name: "routeUpdate", params: { id } });
};
</script>

<style scoped>
.btn-delete i {
  color: var(--white);
}
</style>