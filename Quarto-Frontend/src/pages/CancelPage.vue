<template>
  <div class="windows">
    <div class="column items-center justify-center" style="height: 100vh">
      <div class="text-h4 text-weight-bold text-dark q-mb-lg">
        Transaccion Rechazada
      </div>
      <q-img
        style="width: 150px; height: 150px"
        src="../assets/cancelCheck.gif"
        alt="CheckGif"
      ></q-img>
      <q-btn
        :outline="true"
        rounded
        style="margin-top: 90px"
        color="primary"
        size="20px"
        >Regresar</q-btn
      >
    </div>
  </div>
</template>

<style scoped>
.windows {
  background-color: #fcf7f1;
}
</style>
