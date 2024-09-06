<template>
  <div>
    <q-card class="bg-white text-white q-mx-md">
      <q-card-section class="column items-center row">
        <q-icon name="mdi-home-city" color="primary" size="90px"></q-icon>
        <div class="text-h6 text-dark text-weight-bold text-center">
          ¿Aun no tienes ningun hospedaje creado que reservados?
        </div>
      </q-card-section>

      <q-card-section class="text-info text-subtitle1 text-center">
        Descubre, crea y comparte espacios únicos con nuestra app Quarto.
        Convierte tu propiedad en un lugar acogedor para viajeros de todo el
        mundo. ¡Únete a nuestra comunidad y vive la experiencia Quarto!
      </q-card-section>

      <q-card-actions class="flex justify-center">
        <q-btn class="q-mb-md" color="secondary" size="17px" @click="menubtn"
          >Empieza ahora</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const menubtn = () => {
  router.push("/createApartment");
};
</script>
<style scoped></style>
