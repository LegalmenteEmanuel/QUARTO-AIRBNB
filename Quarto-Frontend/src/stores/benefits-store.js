import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useBenefitStore = defineStore('benefit', () => {
  const benefits = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchBenefits = async () => {
    isLoading.value = true;
    try {
      const res = await api({
        url: "/benefit",
        method: "GET"
      });
      benefits.value = [...res.data.benefits];
      isLoading.value = false;
    } catch (err) {
      error.value = err.response?.data || 'Error al cargar beneficios';
      isLoading.value = false;
    }
  };

  const createBenefit = async (benefitData) => {
    isLoading.value = true;
    try {
      const response = await api.post('/benefit', benefitData);
      benefits.value.push(response.data.benefit);
      return response.data.benefit;
    } catch (err) {
      error.value = err.message || 'Error al crear el beneficio';
    } finally {
      isLoading.value = false;
    }
  };

  const updateBenefit = async (id, benefitData) => {
    isLoading.value = true;
    try {
      const response = await api.patch(`/benefit/${id}`, benefitData);
      const index = benefits.value.findIndex(b => b._id === id);
      if (index !== -1) {
        benefits.value[index] = response.data.benefit;
      }
      return response.data.benefit;
    } catch (err) {
      error.value = err.message || 'Error al actualizar el beneficio';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteBenefit = async (id) => {
    isLoading.value = true;
    try {
      await api.delete(`/benefit/${id}`);
      benefits.value = benefits.value.filter(b => b._id !== id);
    } catch (err) {
      error.value = err.message || 'Error al eliminar el beneficio';
    } finally {
      isLoading.value = false;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return {
    benefits,
    isLoading,
    error,
    fetchBenefits,
    createBenefit,
    updateBenefit,
    deleteBenefit,
    resetError
  };
});
