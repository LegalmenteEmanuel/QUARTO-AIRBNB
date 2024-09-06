<template>
  <div class="glacial-font">
    <q-layout>
      <q-header>
        <q-toolbar style="background-color: #fcf7f1">
          <div class="container">
            <div>
              <a href="#">
                <img class="quartoLogoHeader" src="../assets/logoRosa.svg" />
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
            class="selectable-item"
            active
            clickable
            v-ripple
            @click="registro"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-account-plus"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Regístrate</q-item-section>
          </q-item>

          <q-item
            class="selectable-item"
            active
            clickable
            v-ripple
            @click="inicio"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-login"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Inicia sesión</q-item-section>
          </q-item>

          <q-item
            class="selectable-item"
            active
            clickable
            v-ripple
            @click="sobrenosotros"
          >
            <q-item-section avatar>
              <q-icon
                class="q-ml-xs"
                size="30px"
                name="mdi-information"
                color="white"
              ></q-icon>
            </q-item-section>
            <q-item-section class="textMenu">Sobre nosotros</q-item-section>
          </q-item>
        </q-list>
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

const registro = () => {
  router.push("/register");
  tabMenu.value = true;
};

const inicio = () => {
  router.push("/login");
  tabMenu.value = true;
};

const sobrenosotros = () => {
  console.log("sobre Nosotros");
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
  margin-left: -14px;
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
</style>
