<template>
  <q-page>
    <div>
      <div class="text-dark text-h4 text-weight-normal q-mt-lg q-ml-md q-mb-md">
        Tus hospedajes
      </div>
      <q-btn class="q-mb-md q-ml-md" color="primary" size="17px" @click="crear"
        >Crear hospedaje</q-btn
      >
    </div>
    <CardNohospedajes
      v-if="!propertiesHostings"
      class="q-mt-md"
    ></CardNohospedajes>

    <div v-for="(hosting, index) in slicedProperties" :key="index">
      <CardHosting
        class="q-mt-xs q-mb-md"
        :hosting="hosting"
        @click="infoApartment(hosting)"
      ></CardHosting>
    </div>

    <q-pagination
      v-model="current"
      class="flex justify-center q-mb-md"
      size="22px"
      gutter="sm"
      :max="totalPages"
      direction-links
      push
      color="secondary"
      active-design="push"
      active-color="primary"
      @change="changePage"
    />
  </q-page>
</template>

<script setup>
import { useRentStore } from "../stores/rent-store";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import CardNohospedajes from "../components/viajes/CardNohospedajes.vue";
import CardHosting from "../components/viajes/CardHosting.vue";

const rentStore = useRentStore();
const router = useRouter();
const propertiesHostings = ref(null);
const current = ref(1);
const itemsPerPage = ref(4); // Number of properties to show per page

// Computed property to slice the displayed properties based on pagination
const slicedProperties = computed(() => {
  const start = (current.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return propertiesHostings.value
    ? propertiesHostings.value.slice(start, end)
    : [];
});

// Computed property to calculate the total number of pages
const totalPages = computed(() => {
  return propertiesHostings.value
    ? Math.ceil(propertiesHostings.value.length / itemsPerPage.value)
    : 1;
});

const changePage = (newPage) => {
  current.value = newPage;
};

const getHostings = async () => {
  await rentStore.getHostingsProperties();
  propertiesHostings.value = rentStore.hositingProperties;
};

const infoApartment = (hosting) => {
  console.log(hosting);
};

const crear = () => {
  router.push("/createApartment");
};

getHostings();
</script>

<style scoped></style>
