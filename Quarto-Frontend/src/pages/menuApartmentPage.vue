<template>
  <div class="menu-apartment-page">
    <div class="header-and-cards-container">
      <div class="search-bar">
        <q-input
          class="q-mt-md"
          outlined
          v-model="searchTerm"
          dense
          placeholder="Encuentra tu estadía ideal"
          debounce="300"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="header-location">
        <div class="line"></div>
        <q-icon name="place" class="location-icon" />
        <div class="line"></div>
      </div>

      <CardApartmentsComponent
        v-for="apartment in slicedFilteredApartments"
        :key="apartment._id"
        :apartment-image="getApartmentImage(apartment)"
        :title="apartment.name"
        :location="apartment.location.direccion"
        :price="apartment.price"
        :bedrooms="apartment.dataRoom.numBeds"
        :bathrooms="apartment.dataRoom.numBath"
        :benefits="apartment.benefits"
        @click="infoProperty(apartment)"
      />

      <q-pagination
        v-model="current"
        class="flex justify-center q-mb-md"
        size="20px"
        gutter="sm"
        :max="totalPages"
        :max-pages="4"
        direction-links
        push
        :boundary-numbers="false"
        color="secondary"
        active-design="push"
        active-color="primary"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { useRentStore } from "src/stores/rent-store";
import { ref, computed } from "vue";
import CardApartmentsComponent from "../components/card-apartments.component.vue";
import { usePropertieStore } from "../stores/properties.store";
import { useRouter } from "vue-router";

const rentStore = useRentStore();
const router = useRouter();
const propertieStore = usePropertieStore();

const isLoading = ref(false);
const error = ref(null);
const searchTerm = ref("");
const current = ref(1);
const itemsPerPage = ref(4);
const propiertiesMenu = ref(null);

const fetchApartments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await propertieStore.fetchProperties();
    propiertiesMenu.value = propertieStore.properties;
  } catch (err) {
    error.value = err.response?.data || "Error fetching properties";
  } finally {
    isLoading.value = false;
  }
};

const filteredApartments = computed(() => {
  // Filter apartments based on search term in address
  return (propiertiesMenu.value || []).filter((apartment) => {
    const searchText = searchTerm.value.toLowerCase();
    const addressText = apartment.location.direccion.toLowerCase();
    return addressText.includes(searchText);
  });
});

const slicedFilteredApartments = computed(() => {
  const start = (current.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredApartments.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredApartments.value.length / itemsPerPage.value);
});

const changePage = (newPage) => {
  current.value = newPage;
};

fetchApartments();

const getApartmentImage = (apartment) => {
  if (apartment.images && apartment.images.length > 0) {
    return apartment.images[0].image;
  } else {
    return "URL_DE_IMAGEN_POR_DEFECTO";
  }
};

const infoProperty = (rent) => {
  rentStore.rentInfoProperty = rent;
  rentStore.rentIsTrue = false;
  router.push("/infoApartment");
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.menu-apartment-page {
  font-family: "Glacial Indifference", sans-serif;
}

.header-and-cards-container {
  max-width: 350px;
  margin: auto;
}

.header-location {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.header-location .location-icon {
  color: #635c5c;
}

.location-icon {
  padding: 0 15px;
  font-size: 24px;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #635c5c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}

.pagination .q-btn {
  min-width: 36px;
}

.ellipsis {
  padding: 0 15px;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.location-page-icon {
  font-size: 24px;
  margin-right: 8px;
}

.search-bar {
  max-width: 350px;
  margin: auto;
  margin-bottom: 20px;
}
</style>
