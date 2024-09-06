<template>
  <div class="glacial-font">
    <q-page class="page">
      <q-card class="principal">
        <div class="text-center q-mb-md">
          <q-img
            v-if="userStore.user.image"
            class="imagePerfil"
            :src="userStore.user.image"
          ></q-img>
          <q-img
            v-else
            class="imagePerfil defaultImage"
            src="../assets/imagePerfil.png"
          ></q-img>
        </div>
      </q-card>

      <div class="textUser q-ml-md text-center">
        {{ userStore.user.name }}
      </div>
      <div class="containerProfile">
        <div class="my-section-container">
          <div class="detalles1">
            <span class="detallesUsuario">Detalles de usuario</span>
          </div>
          <div class="detalles2">
            <q-btn
              class="btn-editarPerfil"
              label="Editar Perfil"
              color="secondary"
              no-caps
              @click="editarPerfilUser()"
            />
          </div>
          <div class="detalles3">
            <span class="detallesUsuario">Dirección de correo</span>
          </div>
          <div class="textUser2">
            {{ userStore.user ? userStore.user.email : "" }}
          </div>
          <div class="detalles3">
            <span class="detallesUsuario">Número de teléfono</span>
          </div>
          <div class="textUser3">
            {{ userStore.user ? userStore.user.phone : "" }}
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const editarPerfilUser = () => {
  router.push("/perfil/edit");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}

.page {
  background-color: white;
  overflow: hidden;
}

.principal {
  background-color: #635c5c !important;
  height: 150px;
  width: 100%;
  border-radius: 0%;
}

.containerProfile {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}

.textUser {
  color: #635c5c;
  font-size: 30px;
  padding-top: 95px;
}

.textUser2 {
  color: #635c5c;
  font-size: 22px;
  padding-top: 7px;
  margin-left: 20px;
}

.textUser3 {
  color: #635c5c;
  font-size: 22px;
  padding-top: 7px;
  margin-left: 20px;
  margin-bottom: 50px;
}

.imagePerfil {
  width: 170px;
  height: 170px;
  margin-top: 60px;
  border-radius: 50%;
}

.my-section-container {
  display: flex;
  align-items: start;
  flex-direction: column;
}

.detallesUsuario {
  font-size: 1.3rem;
}

.detalles1 {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 45px;
  font-size: 25px;
}
.detalles2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin: 20px;
  width: 85%;
}

.detalles3 {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left: 20px;
}

.btn-editarPerfil {
  width: 100%;
  height: 58px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
