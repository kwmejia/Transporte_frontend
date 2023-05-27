<template>
  <header class="container-fluid header">
    <nav class="w-100">
      <ul
        class="d-flex flex-wrap w-100 justify-content-center gap-5 align-items-center m-0"
      >
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'routes' }">Rutas</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'home' }">
            <img src="/img/logo.png" alt="" width="200" />
          </router-link>
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
  background: var(--blue);
  padding: 20px 0;
}

.header ul li a {
  color: var(--white);
  font-size: 18px;
  transition: 0.3s all;
  user-select: none;
  -webkit-user-drag: none;
}
.header ul li a img {
  -webkit-user-drag: none;
}
.header ul li a.active {
  color: var(#85db00) !important;
}
.header ul li a:hover {
  color: var(--succcess);
}
</style>