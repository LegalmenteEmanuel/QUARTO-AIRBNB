<template>
  <div>
    <q-card class="bg-white text-white q-mx-md q-pa-md">
      <q-card-section horizontal>
        <q-img
          :src="rent.propertyId.images[0].image"
          style="height: 90px; max-width: 80px; border-radius: 10px"
          width="80px"
          height="90px"
          :alt="rent.propertyId.images[0].fileName"
        ></q-img>
        <div class="q-ml-md q-mb-md column justify-between">
          <div class="text-subtitle text-dark text-weight-bold">
            {{ rent.propertyId.name }}
          </div>
          <div class="text-subtitle1 text-primary text-weight-medium">
            L. {{ rent.propertyId.price }}
          </div>
          <div class="flex items-center">
            <q-icon
              name="mdi-clock-time-eight-outline"
              color="dark"
              size="18px"
            ></q-icon>
            <div class="text-subtitle2 text-info text-weight-light q-ml-xs">
              {{ rent.initialDate }} hasta {{ rent.finalDate }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const { rent } = defineProps(["rent"]);
const router = useRouter();
</script>
<style scoped></style>
