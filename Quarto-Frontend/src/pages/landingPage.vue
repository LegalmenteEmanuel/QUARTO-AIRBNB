<template>
  <div class="glacial-font">
    <q-img
      src="../assets/casabonitaa.svg"
      class="q-pa-md"
      content-class="q-pa-md"
      basic
    >
      <h3 class="title1">Encuentra tu apartamento</h3>
      <div class="principal">
        <div class="line"></div>
        <img src="../assets/ubicacion.svg" height="27px" />
        <div class="line"></div>
      </div>
      <div>
        <p class="textQ">
          Quarto facilita encontrar el alojamiento perfecto para estudiantes
          universitarios. Busca, encuentra y alquila tu próximo hogar cerca de
          la universidad de manera sencilla y segura.
        </p>
      </div>
      <div class="container">
        <q-select
          standout
          dense
          bg-color="white"
          v-model="model"
          :options="options"
          label="Tipo de propiedad"
        />
        <q-input
          outlined
          class="input-landing"
          v-model="ubicacion"
          bg-color="white"
          dense
          placeholder="Escriba la ubicación"
        ></q-input>
        <q-btn
          type="submit"
          class="btn-buscar"
          label="Buscar"
          text-color="white"
          @click="filteredProperties"
        />
      </div>
    </q-img>

    <div>
      <h5
        class="text-center text-weight-bold"
        style="color: #625c5c; font-size: 25px"
      >
        Nuestros Servicios
      </h5>
      <CardServicios></CardServicios>
    </div>
    <div class="services">
      <h5
        class="text-center text-weight-bold q-ml-md q-mr-md"
        style="margin-top: 25px; color: #625c5c; font-size: 25px"
      >
        ¿Cómo usar el servicio de Quarto?
      </h5>
      <CardPasos></CardPasos>
    </div>
  </div>
  <div>
    <div class="text-center q-mt-xl q-mb-xs">
      <img src="../assets/logoAzul.svg" width="140px" />
    </div>
    <p class="text-center text-h6 text-weight-medium q-ml-lg q-mr-lg q-mb-xl">
      Donde tu futuro comienza con un buen hogar
    </p>
    <div class="line1"></div>

    <div class="contactos" style="font-size: 18px">
      <div>
        <img class="q-mr-xs" src="../assets/telefono.svg" width="25px" />
      </div>
      <div>
        <span>+504 2220-0277</span>
      </div>
    </div>
    <div class="contactos1" style="font-size: 18px">
      <div>
        <img class="q-mr-xs" src="../assets/correo.svg" width="30px" />
      </div>
      <div>
        <span>informacion@quartohn.com</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardServicios from "src/components/cardServicios.vue";
import CardPasos from "src/components/cardPasos.vue";
import { ref, computed } from "vue";

const model = ref([]);
const ubicacion = ref([]);
const options = ["Casa", "Apartamento"];

// Función de filtrar o buscar propiedades
const searchTerm = ref("");
const formattedProperties = ref([]);
const filteredProperties = computed(() => {
  if (searchTerm.value) {
    return formattedProperties.value.filter(
      (property) =>
        property.location.direccion
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase()) ||
        property.category.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  return formattedProperties.value;
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}
.principal {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
  background-color: rgba(0, 0, 0, 0);
}
.line {
  border-bottom: 3px solid white;
  width: 137px;
  margin: 25px;
}
.title1 {
  color: white;
  text-align: center;
  font-size: 40px;
  margin-top: 24px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(99, 92, 92, 0.8);
  height: 35%;
  width: 85%;
  margin-top: 100px;
  margin-left: 33px;
}

.textQ {
  color: white;
  text-align: center;
  font-size: 14px;
  margin: 14px;
  margin-top: -10px;
}

.input-landing {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 11px;
}

.btn-buscar {
  font-weight: bold;
  text-transform: none;
  color: white;
  width: 100%;
  background-color: #5fbfb8 !important;
}
.services {
  background-color: #fcf7f1;
  padding-top: 20px;
}

.btn-unirse {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: none;
  color: white;
  width: 60%;
  background-color: white !important;
  border: solid 1.2px #f39da9 !important;
  background-color: #f39da9 !important;
}
.line1 {
  width: 100%;
  border-bottom: 1px solid #e3d2c6;
  margin: 20px auto;
}

.contactos {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 33px;
}
.contactos1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 35px;
}
</style>
s
