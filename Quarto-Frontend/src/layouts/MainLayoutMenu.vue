<template>
  <div class="glacial-font">
    <q-layout>
      <q-header>
        <q-toolbar style="background-color: #fcf7f1">
          <div class="container">
            <div>
              <a href="#">
                <img
                  class="quartoLogoHeader"
                  src="../assets/logoRosa.svg"
                  @click="menuPrincipal"
                />
              </a>
            </div>
          </div>
          <div class="row q-pa-xs">
            <q-btn
              @click="(drawerRight = !drawerRight), (tabMenu = !tabMenu)"
              flat
              round
              icon="menu"
              size="25px"
              color="black"
            />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        side="right"
        v-model="drawerRight"
        :width="270"
        :breakpoint="500"
        style="background-color: #545454"
        overlay
        behavior="desktop"
      >
        <q-list padding class="listMenu">
          <q-item
            class="selectable-item q-mb-xs"
            active
            clickable
            v-ripple
            @click="menuPrincipal"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-home"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Menu Principal</q-item-section>
          </q-item>

          <q-item
            class="selectable-item q-mb-xs"
            active
            clickable
            v-ripple
            @click="perfil"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-account"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Perfil</q-item-section>
          </q-item>

          <q-item
            class="selectable-item q-mb-xs"
            active
            clickable
            v-ripple
            @click="alquiladas"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-home-city"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu"
              >Propiedades alquiladas</q-item-section
            >
          </q-item>

          <q-item
            class="selectable-item q-mb-xs"
            active
            clickable
            v-ripple
            @click="creadas"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-home-plus"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu"
              >Propiedades creadas</q-item-section
            >
          </q-item>

          <q-item
            class="selectable-item q-mb-xs"
            active
            clickable
            @click="logout"
            v-if="userStore.token"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-logout"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Cerrar sesión</q-item-section>
          </q-item>
        </q-list>

        <div class="absolute-top q-mb-lg">
          <div class="q-ml-md q-mt-lg">
            <q-img
              :src="
                userStore.user.image
                  ? userStore.user.image
                  : 'https://skillsagebucketkarlas.s3.us-east-2.amazonaws.com/imagePerfil.png'
              "
              class="imagenUser"
            />
          </div>
          <div class="textUser">
            {{ userStore.user ? `${userStore.user.name}` : "" }}
          </div>
        </div>
      </q-drawer>
      <q-footer elevated>
        <q-toolbar class="footer">
          <q-toolbar-title>
            <div class="copyrightFooter">
              <div class="footerQuarto">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="titleFooter">QUARTO</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="copyrights">© 2024, Derechos Reservados</div>
                  </div>
                  <div class="redes">
                    <img
                      class="imageRedes"
                      src="../assets/facebook.svg"
                      width="20px"
                    />
                    <img
                      class="imageRedes"
                      src="../assets/instagram.svg"
                      width="20px"
                    />
                    <img
                      class="imageRedes"
                      src="../assets/twitter.svg"
                      width="20px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user-store";

const drawerRight = ref(false);
const router = useRouter();
const tabMenu = ref(true);
const userStore = useUserStore();

const menuPrincipal = () => {
  router.push("/menu");
};

const perfil = () => {
  router.push("/perfil");
  tabMenu.value = true;
};

const logout = async () => {
  await userStore.logout();
  router.push("/");
};

const creadas = () => {
  router.push("/hospedajes/creados");
};

const alquiladas = () => {
  router.push("/viajes");
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}

.headerClass {
  overflow-y: hidden;
  position: fixed;
}
.container {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quartoLogoHeader {
  width: 130px;
  padding-left: 18px;
}

.textMenu {
  color: white;
  font-size: 17px;
  margin-left: -10px;
}

.footer {
  background-color: #545454;
  height: 80px;
}
.titleFooter {
  color: white;
  font-size: 15px;
}

.copyrights {
  color: white;
  font-size: 16px;
}

.redes {
  margin-left: 45px;
}
.imageRedes {
  margin-left: 10px;
}

.selectable-item {
  transition: background-color 0.3s;
}

.selectable-item:hover {
  background-color: #5fbfb8;
}

.selectable-item:active {
  background-color: #5fbfb8;
}

.imagenUser {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.listMenu {
  margin-top: 148px;
}

.textUser {
  color: #5fbfb8;
  font-size: 20px;
  padding-top: 7px;
  padding-left: 25px;
}
</style>
