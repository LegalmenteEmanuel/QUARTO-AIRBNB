<template>
  <div class="calificacionApartamentos">
    <q-rating
      class="calification"
      v-model="calificacion"
      name="quality"
      max="5"
      icon="star_border"
      icon-selected="star"
      no-dimming
    />

    <q-btn
      class="btn-calificar"
      label="Calificar"
      @click="onSubmit"
      color="secondary"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCourseStore } from "src/stores/course-store";
import { useUserStore } from "src/stores/user-store";
import { useNotify } from "src/hooks/notifyHook";
const courseStore = useCourseStore();
const { successNotify } = useNotify();
const calificacion = ref(0);
if (courseStore.infoCourse) {
  const userId = useUserStore().user._id;
  const existingRating = courseStore.infoCourse.ratings.find(
    (rating) => rating.user === userId
  );
  if (existingRating) {
    calificacion.value = existingRating.rating;
  }
}
const onSubmit = async () => {
  try {
    await courseStore.rateCourse(calificacion.value);
    successNotify("Gracias por calificar el curso");
  } catch (error) {
    console.error("Error al calificar el curso:", error);
  }
};
</script>

<style>
.calificacionApartamentos {
  display: flex;
  flex-direction: column;
  size: 3rem;
}
.calification {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #bcbaef;
}
.btn-calificar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
}
</style>
