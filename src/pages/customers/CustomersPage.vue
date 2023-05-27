<template>
  <h1 class="text-center my-4">Clientes</h1>
  <section class="container">
    <div class="mb-4">
      <router-link :to="{ name: 'newCustomer' }" class="succes-btn my-4">
        <i class="fas fa-plus me-2"></i>
        <span>Nuevo cliente</span>
      </router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Identifiacion</th>
          <th scope="col">Telefono</th>
          <th scope="col">Nombre de Ruta</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody v-if="!loadingGetCustomers">
        <tr v-for="(customer, index) in listCustomers" :key="customer.id">
          <td class="ps-3 fw-bold">{{ index + 1 }}</td>
          <td>{{ customer.cus_name + " " + customer.cus_lastname }}</td>
          <td>{{ customer.cus_identification }}</td>
          <td>{{ customer.cus_phone }}</td>
          <td>{{ customer.rou_name }}</td>
          <td class="d-flex gap-3">
            <button
              class="btn btn-danger"
              @click="alertDeleteIdea(customer.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary" @click="goToEdit(customer.id)">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loadingGetCustomers" class="w-100 d-flex justify-content-center">
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

let listCustomers = ref([]);
let loadingGetCustomers = ref(false);
const router = useRouter();

onMounted(() => {
  getAllCustomers();
});

async function getAllCustomers() {
  try {
    loadingGetCustomers.value = true;
    const resp = await clientHTTP.get(`${baseURL}/customers`);
    listCustomers.value = await resp.data.data;
    loadingGetCustomers.value = false;
  } catch (error) {
    showAlertError();
  }
}

const alertDeleteIdea = (id) => {
  Swal.fire({
    title: "Estas seguro que quieres eliminar este cliente?",
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
    await clientHTTP.delete(`${baseURL}/customers?idCustomer=${id}`);
    showAlertSuccessToast();
  } catch (error) {
    showAlertError();
  } finally {
    getAllCustomers();
  }
};

const goToEdit = (id) => {
  router.push({ name: "customersUpdate", params: { id } });
};
</script>

<style>
</style>