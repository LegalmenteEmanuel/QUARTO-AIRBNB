<template>
  <div>
    <q-card class="bg-white text-white q-mx-md q-pa-md">
      <q-card-section horizontal>
        <q-img
          :src="hosting.images[0].image"
          style="height: 90px; max-width: 80px; border-radius: 10px"
          width="80px"
          height="90px"
          :alt="hosting.images[0].fileName"
        ></q-img>
        <div class="q-ml-md q-mb-md column justify-between">
          <div class="text-subtitle text-dark text-weight-bold">
            {{ hosting.name }}
          </div>
          <div class="text-subtitle1 text-primary text-weight-medium">
            L. {{ hosting.price }}
          </div>
          <div class="flex items-center">
            <div class="text-subtitle2 text-info text-weight-light q-ml-xs">
              {{ hosting.typeRoom.name }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const { hosting } = defineProps(["hosting"]);
</script>
<style scoped></style>
