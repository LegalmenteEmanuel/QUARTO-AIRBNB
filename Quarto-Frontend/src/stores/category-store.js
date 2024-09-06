import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchCategories = async () => {
    isLoading.value = true;
    try {
      const res = await api({
        url: "/category",
        method: "GET"
      });
      categories.value = [...res.data.categories];
      isLoading.value = false;
    } catch (err) {
      error.value = err.response?.data || 'Error al cargar categorías';
      isLoading.value = false;
    }
  };

  const createCategory = async (name, description) => {
    try {
      const response = await api.post("/category", { name, description });
      categories.value.push(response.data.category);
      return response.data;
    } catch (err) {
      error.value = err.response?.data || 'Error al crear categoría';
      throw err;
    }
  };

  const updateCategory = async (id, name, description) => {
    try {
      const response = await api.put(`/category/${id}`, { name, description });
      const index = categories.value.findIndex(cat => cat._id === id);
      if (index !== -1) {
        categories.value[index] = response.data.category;
      }
      return response.data;
    } catch (err) {
      error.value = err.response?.data || 'Error al actualizar categoría';
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      categories.value = categories.value.filter(cat => cat._id !== id);
      return { message: 'Categoría eliminada correctamente' };
    } catch (err) {
      error.value = err.response?.data || 'Error al eliminar categoría';
      throw err;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    resetError,
  };
});
