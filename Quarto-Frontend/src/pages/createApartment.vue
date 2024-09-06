<template>
  <div class="q-pa-md register-container glacial-font">
    <q-stepper
      v-model="step"
      animated
      active-color="purple"
      inactive-color="grey-6"
      contracted
    >
      <q-step :name="1" :prefix="1" title="Seleccionar Tipo de Propiedad">
        <div class="text-h6 text-center q-mb-md">
          ¿Cuál de estas opciones describe mejor tu alojamiento?
        </div>
        <div class="selection-container">
          <div class="category-container">
            <div
              class="category-box"
              v-for="category in categoryStore.categories"
              :key="category._id"
              :class="{ selected: category._id === selectedCategoryId }"
              @click="selectCategory(category._id)"
            >
              <q-icon :name="getIcon(category.name)" class="category-icon" />
              <div class="category-content">
                <div class="category-name">{{ category.name }}</div>
                <div class="category-description">
                  {{ category.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="2" :prefix="2" title="Tipo de Habitación">
        <div class="text-h6 text-center q-mb-md">
          ¿Qué tipo de habitación ofreces?
        </div>
        <div class="selection-container">
          <div class="category-container">
            <div
              class="category-box"
              v-for="typeRoom in typeRoomStore.typeRooms"
              :key="typeRoom._id"
              :class="{ selected: typeRoom._id === selectedTypeRoomId }"
              @click="selectTypeRoom(typeRoom._id)"
            >
              <q-icon
                :name="getIconTypeRoom(typeRoom.name)"
                class="category-icon"
              />
              <div class="category-content">
                <div class="category-name">{{ typeRoom.name }}</div>
                <div class="category-description">
                  {{ typeRoom.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="3" :prefix="3" title="Establecer Precios">
        <div class="q-ma-md">
          <div class="text-dark text-h5 q-my-md">Ubicacion de la propiedad</div>
          <GoogleMap
            api-key="AIzaSyB4xsQv7JzSsxoF_OgNAWm6_bhD45C1fAY"
            style="height: 400px"
            :center="center"
            :zoom="15"
            @click="handleMapClick"
          >
          </GoogleMap>
          <div v-if="selectedLocation" class="location-info">
            <p><strong>Ubicación:</strong></p>
            <p><span>País:</span> {{ country }}</p>
            <p><span>Departamento:</span> {{ administrativeArea }}</p>
            <p><span>Municipio:</span> {{ locality }}</p>
            <p>
              <span>Coordenadas:</span> {{ selectedLocation.lat }},
              {{ selectedLocation.lng }}
            </p>
          </div>
        </div>
      </q-step>

      <q-step :name="4" :prefix="4" title="Datos de la Habitación">
        <div class="text-h6 text-center q-mb-md">Datos de habitaciones</div>
        <div class="espacios-data row justify-center">
          <div class="row justify-center q-my-md">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Huéspedes</div>
              <div class="q-mt-md row items-center">
                <q-btn
                  icon="remove"
                  flat
                  round
                  dense
                  @click="decrease('numGuests')"
                  :disable="roomData.numGuests <= 1"
                />
                <q-input
                  v-model="roomData.numGuests"
                  type="number"
                  min="1"
                  dense
                  readonly
                />
                <q-btn
                  icon="add"
                  flat
                  round
                  dense
                  @click="increase('numGuests')"
                />
              </div>

              <div class="text-subtitle2 q-mt-md">Recámaras</div>
              <div class="row items-center">
                <q-btn
                  icon="remove"
                  flat
                  round
                  dense
                  @click="decrease('numRooms')"
                  :disable="roomData.numRooms <= 1"
                />
                <q-input
                  v-model="roomData.numRooms"
                  type="number"
                  min="1"
                  dense
                  readonly
                />
                <q-btn
                  icon="add"
                  flat
                  round
                  dense
                  @click="increase('numRooms')"
                />
              </div>

              <div class="text-subtitle2 q-mt-md">Camas</div>
              <div class="row items-center">
                <q-btn
                  icon="remove"
                  flat
                  round
                  dense
                  @click="decrease('numBeds')"
                  :disable="roomData.numBeds <= 1"
                />
                <q-input
                  v-model="roomData.numBeds"
                  type="number"
                  min="1"
                  dense
                  readonly
                />
                <q-btn
                  icon="add"
                  flat
                  round
                  dense
                  @click="increase('numBeds')"
                />
              </div>

              <div class="text-subtitle2 q-mt-md">Baños</div>
              <div class="row items-center">
                <q-btn
                  icon="remove"
                  flat
                  round
                  dense
                  @click="decrease('numBath')"
                  :disable="roomData.numBath <= 1"
                />
                <q-input
                  v-model="roomData.numBath"
                  type="number"
                  min="1"
                  dense
                  readonly
                />
                <q-btn
                  icon="add"
                  flat
                  round
                  dense
                  @click="increase('numBath')"
                />
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="5" :prefix="5" title="Beneficios del Lugar">
        <div class="text-h6 text-center q-mb-md">
          Cuéntale a tus huéspedes todo lo que tu espacio tiene para ofrecer
        </div>
        <div class="selection-container">
          <div class="benefit-container">
            <div
              class="benefit-box"
              v-for="benefit in benefits"
              :key="benefit._id"
              :class="{ selected: selectedBenefits.includes(benefit._id) }"
              @click="toggleBenefitSelection(benefit._id)"
            >
              <div class="benefit-content">
                <div class="benefit-name">{{ benefit.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-step>

      <q-step :name="6" :prefix="6" title="Imágenes de la Propiedad">
        <div class="text-h6 text-center q-mb-md">
          Agrega algunas fotos de tu vivienda
        </div>
        <q-file
          v-model="fileList"
          multiple
          label="Subir imágenes (mínimo 5)"
          @update:model-value="updateFileList"
          field-name="image"
          accept="image/*"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" class="cursor-pointer" />
          </template>
        </q-file>

        <div v-if="showError" class="text-negative q-mt-sm">
          Debes subir al menos 5 imágenes. Si eliminas una, tendrás que volver a
          subir todas.
        </div>

        <q-carousel
          v-if="imageURLs.length > 0"
          animated
          swipeable
          v-model="carouselIndex"
          class="q-mt-md"
          navigation
        >
          <q-carousel-slide
            v-for="(url, index) in imageURLs"
            :name="index"
            :key="index"
          >
            <div class="image-container">
              <q-img :src="url"></q-img>
              <q-icon
                name="close"
                class="delete-icon"
                @click="removeImage(index)"
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-step>

      <q-step :name="7" :prefix="7" title="Datos Generales de la Propiedad">
        <div class="text-h6 text-center q-mb-md">
          Agrega algunas fotos de tu vivienda
        </div>
        <div class="text-h6 text-center q-mb-md">
          Información general de tu vivienda
        </div>
        <div class="q-pa-md">
          <q-input
            outlined
            dense
            v-model="listingData.name"
            label="Ponle un nombre a tu vivienda"
            hint="Ingresa el nombre de tu vivienda"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
          <q-input
            outlined
            dense
            v-model="listingData.description"
            type="textarea"
            label="Descripción"
            hint="Describa su vivienda"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
          <q-input
            outlined
            dense
            v-model="listingData.price"
            label="Precio por noche"
            hint="Establece un precio por noche"
            type="number"
            lazy-rules
            :rules="[
              (val) => (val && val > 0) || 'El precio debe ser mayor a cero',
            ]"
          />
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="q-stepper__nav">
          <q-btn
            v-if="step > 1"
            flat
            @click="previousStep"
            label="Atrás"
            class="q-btn--back q-ml-sm"
          />
          <q-btn
            v-if="step < 7"
            @click="nextStep"
            class="q-btn--continue"
            label="Continuar"
          />
          <q-btn
            v-if="step === 7"
            @click="submitProperty"
            class="q-btn--continue"
            label="Finalizar"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useCategoryStore } from "../stores/category-store";
import { useTypeRoomStore } from "../stores/typeRoom-store";
import { useBenefitStore } from "../stores/benefits-store";
import { usePropertyStore } from "../stores/property-store";
import axios from "axios";
import { GoogleMap, Marker, CustomMarker } from "vue3-google-map";

const selectedLocation = ref(null);

const country = ref("");
const administrativeArea = ref("");
const locality = ref("");

const handleMapClick = (event) => {
  center.lat = event.latLng.lat();
  center.lng = event.latLng.lng();

  selectedLocation.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };

  getAddressDetails(selectedLocation.value.lat, selectedLocation.value.lng);
};

const getAddressDetails = (lat, lng) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB4xsQv7JzSsxoF_OgNAWm6_bhD45C1fAY`
    )
    .then((res) => {
      if (res.data.results && res.data.results.length > 0) {
        const addressComponents = res.data.results[0].address_components;
        addressComponents.forEach((component) => {
          if (component.types.includes("country")) {
            country.value = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            administrativeArea.value = component.long_name;
          } else if (component.types.includes("locality")) {
            locality.value = component.long_name;
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error al obtener detalles de la dirección:", error);
    });
};

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

const nextStep = () => {
  if (step.value < 7) step.value++;
};

const previousStep = () => {
  if (step.value > 1) step.value--;
};

//Categorias
const categoryStore = useCategoryStore();
const categories = categoryStore.categories;
const selectCategory = (id) => {
  selectedCategoryId.value = id;
};
const getIcon = (type) => {
  switch (type) {
    case "Casa":
      return "house";
    case "Apartamento":
      return "apartment";
    default:
      return "help";
  }
};

//TypesRooms
const typeRoomStore = useTypeRoomStore();
const selectTypeRoom = (id) => {
  selectedTypeRoomId.value = id;
};
const getIconTypeRoom = (type) => {
  switch (type) {
    case "Alojamiento entero":
      return "house";
    case "Una Habitacion":
      return "single_bed";
    case "Una Habitación compartida":
      return "group";
    default:
      return "help";
  }
};

/* ESPACIOS */

const increase = (field) => {
  roomData.value[field]++;
};

const decrease = (field) => {
  if (roomData.value[field] > 1) {
    roomData.value[field]--;
  }
};

//Beneficios
const benefitStore = useBenefitStore();
const benefits = ref([]);

const fetchBenefits = async () => {
  await benefitStore.fetchBenefits();
  benefits.value = benefitStore.benefits;
};

const toggleBenefitSelection = (benefitId) => {
  const index = selectedBenefits.value.indexOf(benefitId);
  if (index === -1) {
    selectedBenefits.value.push(benefitId);
  } else {
    selectedBenefits.value.splice(index, 1);
  }
};

onMounted(fetchBenefits);

//imagenes
const imageURLs = ref([]);
const carouselIndex = ref(0);
const showError = ref(false);

function updateFileList(newFiles) {
  if (newFiles.length >= 5) {
    fileList.value = [...newFiles];
    imageURLs.value = newFiles.map((file) => URL.createObjectURL(file));
    showError.value = false;
  } else {
    showError.value = true;
  }
}

function removeImage(index) {
  imageURLs.value.splice(index, 1);
  fileList.value.splice(index, 1);

  if (imageURLs.value.length < 5) {
    fileList.value = [];
    imageURLs.value = [];
    showError.value = true;
  }
}

// ON MOUNTED
onMounted(async () => {
  await categoryStore.fetchCategories();
  await typeRoomStore.fetchTypeRooms();
});

//enviar data
const propertyStore = usePropertyStore();
const step = ref(1);
const selectedCategoryId = ref(null);
const selectedTypeRoomId = ref(null);
const roomData = ref({
  numGuests: 1,
  numRooms: 1,
  numBeds: 1,
  numBath: 1,
});
const selectedBenefits = ref([]);
const fileList = ref([]);

const listingData = ref({
  name: "",
  description: "",
  price: null,
});

const formData = reactive({
  selectedCategoryId: null,
  selectedTypeRoomId: null,
  roomData: {
    numGuests: 1,
    numRooms: 1,
    numBeds: 1,
    numBath: 1,
  },
  selectedBenefits: [],
  fileList: [],
  listingData: {
    name: "",
    description: "",
    price: null,
  },
});

const submitProperty = async () => {
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append("image", file);
  });

  formData.append("category", selectedCategoryId.value);
  formData.append("typeRoom", selectedTypeRoomId.value);
  formData.append(
    "location",
    JSON.stringify({
      latitud: selectedLocation.value ? selectedLocation.value.lat : null,
      longitud: selectedLocation.value ? selectedLocation.value.lng : null,
      direccion:
        country.value + ", " + administrativeArea.value + ", " + locality.value,
    })
  );
  formData.append("dataRoom", JSON.stringify(roomData.value));
  formData.append(
    "benefits",
    JSON.stringify(selectedBenefits.value.map((id) => ({ _id: id })))
  );
  formData.append("name", listingData.value.name);
  formData.append("description", listingData.value.description);
  formData.append("price", listingData.value.price);

  console.log("Sending FormData with files and data");
  await propertyStore.addProperty(formData);
};
</script>

<style scoped>
.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}
/* Strepper Container */
.register-container .q-stepper {
  border: none;
  box-shadow: none;
}

.register-container .q-stepper__step {
  border: none;
}

/* Botones */
.q-btn--back {
  background-color: transparent;
  color: #f39daa;
  border: 2px solid #f39daa;
  border-radius: 0;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: 0 2px 2px 0 rgba(243, 157, 170, 0.2);
}

.q-btn--continue {
  background-color: #00bfa5;
  color: #ffffff;
  border: none;
  border-radius: 0;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  box-shadow: 0 2px 2px 0 rgba(0, 191, 165, 0.2);
}

.q-stepper__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* Categorias */
.category-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.category-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: border-color 0.3s ease, border-width 0.3s ease;
  cursor: pointer;
  gap: 10px;
}

.category-box.selected {
  border-color: #f39daa;
  border-width: 3px;
}

.category-box:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-icon {
  margin-right: 10px;
  font-size: 24px;
}

.category-content {
}

.category-name {
  font-weight: bold;
}

.category-description {
  font-size: 0.8rem;
  color: #666;
}

/* ESPACIOS */
.espacios-data .q-btn {
  margin: 0 4px;
}

.espacios-data .q-input {
  width: 100px;
  text-align: center;
}

.espacios-data {
  max-width: 600px;
  margin: auto;
}

.text-subtitle2 {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
}

.row.items-center.q-my-md {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.q-btn--continue {
  background-color: #00bfa5;
  color: white;
}

.q-btn--back {
  border: 2px solid #f39daa;
  color: #f39daa;
}

.q-btn--back:hover {
  background-color: #f39daa;
  color: white;
}

.q-btn--continue:hover {
  background-color: #26a69a;
}

.row.justify-center.q-my-md > .col-12.col-md-6 {
  max-width: none;
}

/* beneficios */
.benefit-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: auto;
}

.benefit-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.3s ease, border-width 0.3s ease;
}

.benefit-box.selected {
  border-color: #f39daa;
  border-width: 3px;
}

.benefit-box:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.benefit-icon {
  font-size: 24px;
  color: #333;
  margin-right: 10px;
}

.benefit-content {
}

.benefit-name {
  font-weight: bold;
}

/* Imagenes */
.image-container {
  position: relative;
}

.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  color: #f39daa;
  font-size: 32px;
}

.elemento-sin-scroll {
  overflow: hidden;
}

.location-info {
  margin-top: 20px;
  padding: 10px;
  border: 3px solid #f39daa; /* Cambié el color del borde aquí */
  border-radius: 5px;
  background-color: #f9f9f9;
}

.location-info p {
  margin: 5px 0;
}

.location-info span {
  font-weight: bold;
  margin-right: 5px;
}
</style>
