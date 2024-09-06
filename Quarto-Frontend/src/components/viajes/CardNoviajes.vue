<template>
  <div>
    <q-card class="bg-white text-white q-mx-md">
      <q-card-section class="column items-center row">
        <q-icon name="mdi-earth-off" color="secondary" size="90px"></q-icon>
        <div class="text-h6 text-dark text-weight-bold text-center">
          ¿Aun no tienes Viajes que reservados?
        </div>
      </q-card-section>

      <q-card-section class="text-info text-subtitle1 text-center">
        Explora, reserva y vive nuevas aventuras con nuestra app! Viajar nunca
        fue tan fácil y emocionante.
      </q-card-section>

      <q-card-actions class="flex justify-center">
        <q-btn class="q-mb-md" color="primary" size="17px" @click="menubtn"
          >Empieza a buscar</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const menubtn = () => {
  router.push("/menu");
};
</script>
<style scoped></style>
