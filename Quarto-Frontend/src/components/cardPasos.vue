<template class="glacial-font">
  <div class="my-cardS">
    <div class="cardPasos">
      <img class="imageFlechas" src="../assets/flechaa1.svg" width="180px" />
      <q-card class="cardServ" style="background: #f39daa; margin-left: -48px">
        <q-card-section>
          <div class="row" style="width: 300px">
            <div class="text-h1 text-white text-weight-medium q-mt-md">
              1.
              <img
                class="imagePasos"
                src="../assets/paso1.svg "
                width="150px"
              />
            </div>
          </div>
          <p
            class="text-weight-medium text-white q-ml-md q-mr-md q-mb-md text-center"
            style="font-size: 18px"
          >
            Descarga y regístrate en Quarto
          </p>
        </q-card-section>
      </q-card>
    </div>

    <div class="cardPasos">
      <q-card class="cardServ" style="background: #5fbfb8; margin-left: 38px">
        <q-card-section>
          <div class="row" style="width: 300px">
            <div
              class="text-h1 text-white text-weight-medium"
              style="margin-top: 30px"
            >
              2.
              <img
                style="margin-left: -40px"
                src="../assets/buscar.svg "
                width="190px"
              />
            </div>
          </div>
          <p
            class="text-weight-medium text-white q-ml-md q-mr-md text-center q-mt-xs"
            style="font-size: 18px"
          >
            Busca el apartamento que desees
          </p>
        </q-card-section>
      </q-card>
      <img class="imageFlechas2" src="../assets/flechaa2.svg" width="180px" />
    </div>

    <div class="cardPasos">
      <img class="imageFlechas" src="../assets/flechaa1.svg" width="180px" />
      <q-card class="cardServ" style="background: #f39daa; margin-left: -48px">
        <q-card-section>
          <div class="row" style="width: 300px">
            <div class="text-h1 text-white text-weight-medium">
              3.
              <img
                class="q-mt-xs"
                style="margin-left: -50px"
                src="../assets/pagar.svg "
                width="175px"
              />
            </div>
          </div>
          <p
            class="text-weight-medium text-white q-ml-md q-mr-md text-center"
            style="font-size: 18px"
          >
            Realiza los pagos desde tu móvil
          </p>
        </q-card-section>
      </q-card>
    </div>

    <div class="cardPasos">
      <q-card class="cardServ" style="background: #5fbfb8; margin-left: 38px">
        <q-card-section>
          <div class="row" style="width: 300px">
            <div class="text-h1 text-white text-weight-medium">
              4.
              <img
                style="margin-left: -40px"
                src="../assets/rentar.svg "
                width="175px"
              />
            </div>
          </div>
          <p
            class="text-weight-medium text-white q-ml-md q-mr-md text-center"
            style="font-size: 18px"
          >
            Si tienes apartamentos, súbelos a Quarto
          </p>
        </q-card-section>
      </q-card>
      <img class="imageFlechas2" src="../assets/flechaa2.svg" width="180px" />
    </div>

    <q-card class="cardServ" style="background: #f39daa; margin-left: 145px">
      <q-card-section>
        <div class="row" style="width: 300px">
          <div class="text-h1 text-white text-weight-medium">
            5.
            <img
              style="margin-left: -40px; margin-top: 10px"
              src="../assets/elegir.svg "
              width="175px"
            />
          </div>
        </div>
        <p
          class="text-weight-medium text-white q-ml-xs q-mr-xs text-center"
          style="font-size: 18px"
        >
          Elige Quarto para alquilar o buscar alquiler
        </p>
      </q-card-section>
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
  flex-direction: column;
  background-color: #fcf7f1;
}

.cardPasos {
  display: flex;
  flex-direction: row;
}

.cardServ {
  margin-bottom: 250px;
  border-radius: 0px;
  width: 255px;
  height: 255px;
  top: 5px;
  border-radius: 3px;
  border-radius: 50%;
  margin-bottom: 40px;
}

.imagePasos {
  margin-left: -30px;
}

.imageFlechas {
  margin-top: 130px;
  margin-left: 3px;
}

.imageFlechas2 {
  margin-top: 130px;
  margin-left: -57px;
}
</style>
