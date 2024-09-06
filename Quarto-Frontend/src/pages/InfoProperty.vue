<template>
  <q-page class="glacial-font">
    <div v-if="propertyUse">
      <q-img
        v-if="propertyUse"
        class="img principal"
        :src="propertyUse.images ? propertyUse.images[0].image : ''"
        :ratio="1"
      >
        <div class="absolute-full">
          <div class="">
            <div class="text-h2 q-mt-xl q-ml-md">{{ propertyUse.name }}</div>
            <q-btn color="primary q-mt-xl q-ml-md">Haz un tour</q-btn>
          </div>
        </div>
      </q-img>

      <div class="q-py-lg q-px-md">
        <div class="text-h5 text-dark">Informacion de la Propiedad</div>
        <div class="text-h6 text-info">
          {{ propertyUse.name }}
        </div>
        <div class="text-subtitle1 text-info">
          {{ propertyUse.description }}
        </div>
        <div class="text-primary text-h6">
          Tipo de habitacion: {{ propertyUse.typeRoom.name }}
        </div>
        <q-btn
          class="q-my-md"
          label="Get Details"
          color="secondary"
          @click="dialog = true"
        />
        <q-dialog v-model="dialog" full-width>
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6 text-dark">Datos de la Casa</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <div class="q-mb-md text-h6 text-info">
                <q-icon size="30px" name="mdi-door" color="primary"></q-icon>
                numero de habitaciones:
                {{ propertyUse.dataRoom.numRooms }}
              </div>
              <div class="q-mb-md text-h6 text-info">
                <q-icon size="30px" name="mdi-bed" color="primary"></q-icon>
                numero de Camas: {{ propertyUse.dataRoom.numBeds }}
              </div>
              <div class="q-mb-md text-h6 text-info">
                <q-icon
                  size="30px"
                  name="mdi-human-queue"
                  color="primary"
                ></q-icon>
                numero de huespedes: {{ propertyUse.dataRoom.numGuests }}
              </div>
              <div class="q-mb-md text-h6 text-info">
                <q-icon size="30px" name="mdi-shower" color="primary"></q-icon>
                numero de Baños: {{ propertyUse.dataRoom.numBath }}
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <div class="flex justify-center">
        <div class="text-h5 text-dark text-ewigth-bold q-mx-md q-mb-md">
          Seleccione las fechas de su estadia
        </div>
        <div class="text-dark text-weigth-bold text-h6 q-mr-md">Fechas</div>
        <div class="text-info text-weigth-regular text-subtitle1">
          {{ today }} hasta {{ threeDaysLater }}
        </div>
        <q-date
          class="q-mt-md q-mb-xl"
          style="width: 355px"
          v-model="dates"
          range
          :today-btn="true"
        />
      </div>

      <div class="bg-accent q-py-lg q-px-lg">
        <div class="text-dark text-h6 text-center">
          LO QUE OFRECE EL APARTAMENTO
        </div>
        <div v-for="(benefit, index) in propertyUse.benefits" :key="index">
          <CardBenefit
            :benefit="benefit"
            :color="getColor(index)"
          ></CardBenefit>
        </div>
      </div>

      <div class="q-pa-md">
        <div class="text-h5 text-dark q-mb-md q-mt-lg">
          Galeria de la propiedad
        </div>
        <div>
          <q-carousel swipeable animated v-model="slide" thumbnails infinite>
            <template
              v-for="(image, index) in propertyUse.images"
              :key="image._id"
            >
              <q-carousel-slide :name="index + 1" :img-src="image.image" />
            </template>
          </q-carousel>
        </div>
      </div>
      <div>
        <CardUbicacion :property="propertyUse"></CardUbicacion>
      </div>
      <div class="bg-accent q-py-xl" v-if="reviews">
        <div class="text-h4 text-dark text-center text-weight-medium">
          RESEÑAS
        </div>
        <swiper
          :slides-per-view="1"
          :space-between="50"
          :pagination="true"
          :modules="modules"
        >
          <swiper-slide
            class="q-mb-lg"
            v-for="(review, index) in reviews"
            :key="index"
            ><CardReview :review="review"></CardReview
          ></swiper-slide>
        </swiper>
      </div>
      <div
        class="bg-accent fixed-bottom text-dark text-h5 text-weight-medium q-pb-xs"
        style="z-index: 9999; height: 90px"
      >
        <div class="line"></div>
        <div class="flex justify-between items-center q-pt-lg q-mx-md">
          <div class="text-info text-h5">{{ propertyUse.price }} L/Mes</div>
          <q-btn color="primary" size="17px" @click="buyProperty"
            >Alquilar</q-btn
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { usePropertyStore } from "../stores/property-store";
import { useRentStore } from "src/stores/rent-store";
import CardBenefit from "src/components/cardBenefit.vue";
import CardUbicacion from "src/components/CardUbicacion.vue";
import CardReview from "src/components/CardReview.vue";
import Swal from "sweetalert2";

const propertyUse = ref(null);
const reviews = ref(null);
const dialog = ref(false);
const slide = ref(1);
const modules = [Pagination];
const propertyStore = usePropertyStore();
const rentStore = useRentStore();

const today = ref(
  new Date().toLocaleDateString("es-ES").split("/").reverse().join("/")
); // Obtener la fecha de hoy en formato YYYY/MM/DD
const threeDaysLater = ref(
  new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("es-ES")
    .split("/")
    .reverse()
    .join("/")
); // Obtener la fecha de hoy + 3 días en formato YYYY/MM/DD

const dates = ref({
  from: today, // Fecha de hoy en formato YYYY/MM/DD
  to: threeDaysLater, // Fecha de hoy + 3 días en formato YYYY/MM/DD
});

watch(dates, (newValue) => {
  today.value = newValue ? newValue.from : "";
  threeDaysLater.value = newValue ? newValue.to : "";
});

const datesSelected = ref(false); // Variable booleana para verificar si se han seleccionado las fechas

watch(dates, (newValue) => {
  datesSelected.value = newValue ? newValue.from && newValue.to : false; // Verificar si ambas fechas están seleccionadas
});

const getColor = (index) => {
  return index % 2 === 0 ? "primary" : "secondary";
};

const obtnerPropiedades = async () => {
  if (rentStore.rentIsTrue) {
    await propertyStore.getPropertyById(
      rentStore.rentInfoProperty.propertyId._id
    );
    propertyUse.value = propertyStore.InfoProperty;
    dates.value.from = rentStore.rentInfoProperty.initialDate;
    dates.value.to = rentStore.rentInfoProperty.finalDate;
    datesSelected.value = true;
  } else {
    await propertyStore.getPropertyById(rentStore.rentInfoProperty._id);
    propertyUse.value = propertyStore.InfoProperty;
  }
};

const obtenerReviews = async () => {
  await propertyStore.getPropertiesReviews(propertyUse.value._id);
  reviews.value = propertyStore.reviews;
};
obtnerPropiedades();

const buyProperty = async () => {
  if (!datesSelected.value) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Por favor, seleccione las fechas de su estancia.",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  propertyStore.propertyrent = propertyUse.value;
  propertyStore.dates = dates.value;
  await propertyStore.propertyRent();
  if (propertyStore.url) {
    setTimeout(() => {
      window.location.href = propertyStore.url;
    }, 0);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}

.line {
  border-bottom: 1px solid #635c5c;
  width: 100%;
}
</style>
