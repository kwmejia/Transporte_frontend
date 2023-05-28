<template>
  <header class="container-fluid header d-none d-md-flex">
    <nav class="w-100">
      <ul
        class="d-flex flex-wrap w-100 justify-content-center gap-1 gap-md-5 align-items-center m-0"
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

  <header class="container-fluid header d-md-none">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }">
          <img src="/img/logo.png" alt="" width="200" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon text-light"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav w-100 justify-content-center">
            <li class="nav-item text-center">
              <router-link
                class="nav-link"
                aria-current="page"
                :to="{ name: 'home' }"
                >Home</router-link
              >
            </li>
            <li class="nav-item text-center">
              <router-link :to="{ name: 'routes' }" class="nav-link"
                >Rutas</router-link
              >
            </li>
            <li class="nav-item text-center">
              <router-link class="nav-link" :to="{ name: 'customers' }"
                >Clientes</router-link
              >
            </li>
            <li class="nav-item text-center">
              <router-link class="nav-link" :to="{ name: 'map' }"
                >Mapa</router-link
              >
            </li>
          </ul>
        </div>
      </div>
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