<template>
  <section class="container mt-4">
    <div
      class="banner d-flex justify-content-center align-items-center my-4 mb-5"
    >
      <img src="/img/imgBanner.png" alt="banner" />
      <h4 class="title-banner">
        ¡Bienvenido/a a nuestra empresa de buses, líder en innovación y
        comodidad en el transporte terrestre!
      </h4>
    </div>

    <div class="about mb-4 d-flex flex-wrap justify-content-around">
      <div class="info">
        <img width="60" src="/img/iconSecurity.png" alt="iconSecurity" />
        <h3>Seguridad y comodidad</h3>
        <p>Nos preocupamos por tu bienestar durante todo el viaje.</p>
      </div>
      <div class="info">
        <img width="60" src="/img/iconPoint.png" alt="iconSecurity" />
        <h3>Amplia cobertura</h3>
        <p>
          Nuestra extensa red de rutas abarca una amplia variedad de destinos.
        </p>
      </div>
      <div class="info">
        <img width="60" src="/img/iconCash.png" alt="iconSecurity" />
        <h3>Tarifas competitivas</h3>
        <p>ofrecemos tarifas competitivas y asequibles .</p>
      </div>
    </div>
    <div class="d-flex justify-content-center flex-wrap gap-5">
      <div class="card-info">
        <div class="card-body">
          <h4 class="text-succ">Puntualidad</h4>
          <p>Crea tus rutas marcando el inicio y el final de esta.</p>
          <button class="succes-btn" @click="goToRoutes">Vamos allá</button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-body">
          <h4 class="text-succ">Clientes</h4>
          <p>Asigna nuevos clientes a tus rutas</p>
          <button class="succes-btn" @click="goToRoutes">Vamos allá.</button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-body">
          <h4 class="text-succ">Mapa</h4>
          <p>Visualiza tu ruta y los clientes de ella de forma gráfica.</p>
          <button class="succes-btn" @click="goToRoutes">Vamos allá</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goToRoutes = () => {
  router.push({ name: "routes" });
};
</script>

<style scoped>
.card-info {
  padding: 20px;
  width: 300px;
  border: 1px solid var(--succcess);
  border-radius: 10px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
}

.card-info p {
  color: #817f7f;
}
.banner {
  position: relative;
  height: 300px;
  width: 100%;
  text-align: center;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 40px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.title-banner {
  position: relative;
  z-index: 2;
  width: 80%;
  color: var(--white);
}

.about {
  background: var(--blue2);
  padding: 30px;
  border-radius: 30px;
}

.about .info {
  width: 300px;
  text-align: center;
}

.about .info h3 {
  color: #fafafa;
  font-size: 20px;
}

.about .info p {
  color: #acacac;
}
</style>