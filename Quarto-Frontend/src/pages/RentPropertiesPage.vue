<template>
  <q-page>
    <div>
      <div class="text-dark text-h4 text-weight-normal q-mt-lg q-ml-md">
        Viajes Realizados
      </div>
    </div>
    <CardNoviajes v-if="!propertiesRent" class="q-mt-md"></CardNoviajes>
    <div v-for="(rent, index) in propertiesRent" :key="index">
      <CardViajes
        class="q-mt-md"
        :rent="rent"
        @click="infoApartment(rent)"
      ></CardViajes>
    </div>
  </q-page>
</template>

<script setup>
import { useRentStore } from "../stores/rent-store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import CardNoviajes from "../components/viajes/CardNoviajes.vue";
import CardViajes from "../components/viajes/CardViajes.vue";

const rentStore = useRentStore();
const router = useRouter();
const propertiesRent = ref(null);

const getRents = async () => {
  await rentStore.getRentsProperties();
  propertiesRent.value = rentStore.rentProperties;
};

const infoApartment = (rent) => {
  rentStore.rentInfoProperty = rent;
  console.log(rentStore.rentInfoProperty);
  rentStore.rentIsTrue = true;
  router.push("/infoApartment");
};

getRents();
</script>

<style scoped></style>
