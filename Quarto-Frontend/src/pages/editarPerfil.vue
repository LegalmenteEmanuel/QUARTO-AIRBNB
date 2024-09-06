<template>
  <div class="glacial-font">
    <q-page class="page">
      <div>
        <h4 class="titlePerfil">Editar Perfil</h4>
      </div>
      <div class="profile-container">
        <div style="margin-top: 4px">
          <div
            class="text-h5 text-weight-medium font text-center"
            style="margin-bottom: 30px; color: #404040"
          >
            Cambia tu foto de perfil
          </div>
          <!-- Vista previa de la imagen -->
          <div style="text-align: center; margin-bottom: 20px">
            <q-img
              :src="
                userStore.user.image
                  ? userStore.user.image
                  : 'https://skillsagebucketkarlas.s3.us-east-2.amazonaws.com/imagePerfil.png'
              "
              class="profile-picture"
            />
          </div>
          <div class="inputImage">
            <q-file
              v-model="image"
              color="orange"
              label-color="secondary"
              filled
              square
              accept=".webp, .png, .jpg"
              :input-style="{ color: 'white' }"
              @input="limpiarImage"
            >
              <template #prepend>
                <q-icon name="photo" color="white" />
              </template>
              <template v-if="image" v-slot:append>
                <q-icon
                  name="cancel"
                  color="orange"
                  @click.stop.prevent="limpiarImage"
                  class="cursor-pointer"
                />
              </template>
            </q-file>
          </div>
        </div>
        <div>
          <h4 class="titleDatos">Edita tu información</h4>
          <q-form class="row" @submit.prevent="submitProfile" ref="formEdit">
            <div class="input-datos">
              <p class="subtitulo">Nombre</p>
              <q-input
                outlined
                dark
                class="input"
                v-model="name"
                color="secondary"
                bg-color="secondary"
                style="font-size: 1.1rem"
              />
            </div>

            <div class="input-datos">
              <p class="subtitulo">Número de teléfono</p>
              <q-input
                outlined
                dark
                class="input"
                v-model="phone"
                color="secondary"
                bg-color="secondary"
                style="font-size: 1.1rem"
              />
            </div>

            <q-btn
              type="submit"
              label="Guardar Cambios"
              text-color="white"
              color="primary"
              class="btn-guardar"
            />
          </q-form>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

// Variables
const name = ref(null);
const phone = ref(null);
const image = ref(null);

// Obtener store
const router = useRouter();
const userStore = useUserStore();

// Cargar datos del usuario actual
const loadUserData = () => {
  name.value = userStore.user.name;
  phone.value = userStore.user.phone;
};

loadUserData();

const cargando = ref(false);

const limpiarImage = () => {
  image.value = null;
};

const submitProfile = async () => {
  try {
    const userUpdate = {
      name: name.value,
      phone: phone.value,
      image: image.value,
    };
    await userStore.updateUser(userUpdate);
    router.push("/perfil");
  } catch (error) {
    console.error("Error al actualizar el perfil:", error.message);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}
.page {
  background-color: #fcf7f1;
  overflow: hidden;
}

.titlePerfil {
  font-size: 2.5rem;
  font-family: "Oswald";
  color: #404040;
  text-align: center;
}

.titleDatos {
  font-size: 1.7rem;
  font-family: "Oswald";
  color: #404040;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: -5px;
}

.input-datos {
  width: 90%;
  padding-left: 42px;
  margin-top: 25px;
  color: #404040;
  font-size: 1.1rem;
}

.inputImage {
  background-color: #f39daa;
  display: flex;
  width: 80%;
  flex-direction: row;
  margin-left: 40px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.btn-guardar {
  margin-left: 115px;
  margin-top: 40px;
  height: 50px;
  margin-bottom: 40px;
  font-size: 1.2rem;
  text-transform: none;
}
</style>
