import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const usePropertieStore = defineStore("properties", () => {
  const properties = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const limit = ref(10);
  const userStore = useUserStore();

  const fetchProperties = async () => {
    isLoading.value = true;
    try {
      const response = await api({
        url: "/property",
        method: "GET",
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      properties.value = response.data.properties;
      isLoading.value = false;
    } catch (err) {
      error.value = err.response?.data || "Error fetching properties";
      isLoading.value = false;
    }
  };

  const createProperty = async (userId, propertyData) => {
    isLoading.value = true;
    try {
      const response = await api({
        url: `/property/${userId}`,
        method: "POST",
        data: propertyData,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      isLoading.value = false;
      return {
        url: response.data.url,
      };
    } catch (err) {
      error.value = err.response?.data || "Error al crear la propiedad";
      isLoading.value = false;
      throw error;
    }
  };

  const updateProperty = async (id, updatedProperty) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.put(`/property/${id}`, updatedProperty);
      const index = properties.value.findIndex((p) => p._id === id);
      if (index !== -1) {
        properties.value[index] = response.data.property;
      }
    } catch (err) {
      error.value = err.response?.data || "Error updating property";
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProperty = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await api.delete(`/property/${id}`);
      properties.value = properties.value.filter((p) => p._id !== id);
    } catch (err) {
      error.value = err.response?.data || "Error deleting  property";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    properties,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    isLoading,
    error,
  };
});
