<template>
  <div class="q-ma-md">
    <q-btn @click="getUbication(14.073253, -87.227367)">Ubicacion</q-btn>
    <div class="text-dark text-h5 q-my-md">Ubicacion de la propiedad</div>
    <GoogleMap
      api-key="AIzaSyB4xsQv7JzSsxoF_OgNAWm6_bhD45C1fAY"
      style="height: 400px"
      :center="center"
      :zoom="15"
    >
      <CustomMarker :options="{ position: center, anchorPoint: 'CENTER' }">
        <div style="text-align: center">
          <img
            src="../assets/LogoAzulUni.svg"
            width="30"
            height="30"
            style="margin-bottom: 8px"
          />
          <div
            style="font-size: 1.125rem"
            class="text-secondary text-weight-bold"
          >
            Casa Moderna
          </div>
        </div>
      </CustomMarker>
    </GoogleMap>
    <div class="text-info text-h6 text-weight-bold q-my-md">
      {{ property.location.direccion }}
    </div>
    <div class="text-info text-h6">
      {{ property.location.description }}
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { GoogleMap, Marker, CustomMarker } from "vue3-google-map";
import { ref } from "vue";

const { property } = defineProps(["property"]);
const center = { lat: 14.073253, lng: -87.227367 };
const nameUbicacion = ref("Ubicacion");

const getUbication = (lat, long) => {
  axios
    .get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=AIzaSyB4xsQv7JzSsxoF_OgNAWm6_bhD45C1fAY"
    )
    .then((res) => {
      if (res.data.error_message) {
        console.log(res.data.error_message);
      } else {
        console.log(res.data.results[0].formatted_address);
        nameUbicacion.value = res.data.results[0].formatted_address;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<style scoped></style>
