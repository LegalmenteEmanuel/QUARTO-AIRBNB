<template class="glacial-font">
  <div class="my-cardS">
    <q-card class="cardServ1" style="background-color: #5fbfb8">
      <img src="../assets/encontrarUbicacion.svg" />
    </q-card>
    <q-card class="cardServ1" style="background-color: #f39daa">
      <img src="../assets/cita.svg" />
    </q-card>
  </div>
  <div class="my-cardS">
    <q-card class="cardT1">
      <span
        class="text-center q-mb-xs text-weight-bold text-title"
        style="color: #635c5c"
        >Búsqueda personalizada</span
      >
    </q-card>

    <q-card class="cardT1">
      <span
        class="text-center q-mb-xs text-weight-bold text-title"
        style="color: #635c5c"
        >Gestión de reservas</span
      >
    </q-card>
  </div>
  <div class="my-cardS">
    <q-card class="cardServ" style="background-color: #f39daa">
      <img src="../assets/metodoPago.svg" />
    </q-card>
    <q-card class="cardServ" style="background-color: #5fbfb8">
      <img src="../assets/seguridad.svg" />
    </q-card>
  </div>

  <div class="my-cardS">
    <q-card class="cardT">
      <span
        class="text-center q-mb-xs text-weight-bold text-title"
        style="color: #635c5c"
        >Metodos de pago</span
      >
    </q-card>

    <q-card class="cardT">
      <span
        class="text-center q-mb-xs text-weight-bold text-title"
        style="color: #635c5c"
        >Seguridad y transparencia</span
      >
    </q-card>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Glacial+Indifference&display=swap");

.glacial-font {
  font-family: "Glacial Indifference", sans-serif;
}

.my-cardS {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.cardServ {
  display: flex;
  justify-content: center;
  padding: 8px;
  margin-bottom: 100px;
  border-radius: 0px;
  width: 73px;
  height: 73px;
  top: 5px;
  border-radius: 3px;
}

.cardServ1 {
  padding: 8px;
  display: flex;
  justify-content: center;
  margin-top: 0px;
  margin-bottom: 50px;
  border-radius: 0px;
  width: 73px;
  height: 73px;
  top: -0px;
  border-radius: 3px;
}
.cardT {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: none;
  width: 120px;
  font-size: 17px;
  margin-top: -115px;
}
.cardT1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: none;
  width: 120px;
  font-size: 17px;
  margin-top: -40px;
  margin-bottom: 30px;
  text-align: center;
}
</style>
