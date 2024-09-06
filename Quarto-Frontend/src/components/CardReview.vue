<template>
  <div>
    <div class="bg-white q-my-md q-mx-md q-px-lg q-py-md">
      <q-img
        src="src/assets/comillasIcon.svg"
        style="height: 60px; max-width: 60px"
      ></q-img>
      <q-rating
        v-model="ratingModel"
        name="raiting"
        max="5"
        disable
        size="xs"
        color="primary"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
        class="q-pt-md"
      />
      <div class="text-info text-bod1">
        {{ review.comment }}
      </div>
      <div class="text-body2 text-dark text-weight-bold q-mt-md">
        {{ review.userName }}.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const ratingModel = ref(2);

const { review } = defineProps(["review"]);
</script>
<style scoped></style>
