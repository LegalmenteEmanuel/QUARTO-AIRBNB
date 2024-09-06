<template>
  <div class="windows">
    <div class="column items-center justify-center" style="height: 100vh">
      <div class="text-h4 text-center text-weight-bold text-dark q-mb-lg">
        Transaccion realizada
      </div>
      <q-img
        style="width: 150px; height: 150px"
        src="../assets//successCheck.gif"
        alt="CheckGif"
      ></q-img>
      <q-btn
        :outline="true"
        rounded
        style="margin-top: 90px"
        color="primary"
        size="20px"
        @click="agregarCuartoAlquilado"
        >Continuar</q-btn
      >
    </div>
  </div>
</template>

<script setup>
import { usePropertyStore } from "src/stores/property-store";
import { useRouter } from "vue-router";
const propertyStore = usePropertyStore();
const router = useRouter();

const agregarCuartoAlquilado = async () => {
  await propertyStore.addPucharsedProperty();
  router.push("/menu");
};
</script>

<style scoped>
.windows {
  background-color: #fcf7f1;
}
</style>
