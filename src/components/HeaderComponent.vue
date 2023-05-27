<template>
  <header class="container-fluid header">
    <nav class="w-100">
      <ul class="d-flex w-100 justify-content-around m-0">
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'routes' }">Rutas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'customers' }">Clientes</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'map' }">Mapa</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style>
/* Header */

.header {
  background: var(--primary);
  padding: 20px 0;
}

.header ul li a {
  color: var(--white);
  font-size: 18px;
  transition: 0.3s all;
}

.header ul li a:hover {
  color: var(--succcess);
}
</style>