<template>
  <div>
    <div class="column items-center q-mt-xl">
      <q-icon
        class="col"
        :name="benefit.icon"
        size="4rem"
        :color="color"
      ></q-icon>
      <div class="col text-h4 q-my-xs text-dark">{{ benefit.name }}</div>
      <div class="col text-subtile1 text-info text-center q-mb-md">
        {{ benefit.description }}
      </div>
      <div class="line col"></div>
    </div>
  </div>
</template>

<script setup>
const { benefit, color } = defineProps(["benefit", "color"]);
</script>

<style scoped>
.line {
  border-bottom: 2px solid #e3d2c6;
  width: 100%;
}
</style>
