import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from "vue";

export const useTypeRoomStore = defineStore('typeRoom', () => {
  const typeRooms = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchTypeRooms = async () => {
    isLoading.value = true;
    try {
      const res = await api({
        url: "/typeroom",
        method: "GET"
      });
      typeRooms.value = [...res.data.typeRooms];
      isLoading.value = false;
    } catch (err) {
      error.value = err.response?.data || 'Error al cargar los tipos de habitación';
      isLoading.value = false;
    }
  };

  const createTypeRoom = async (typeRoomData) => {
    isLoading.value = true;
    try {
      const response = await api.post('/typeroom', typeRoomData);
      typeRooms.value.push(response.data.typeRoom);
      return response.data.typeRoom;
    } catch (err) {
      error.value = err.message || 'Error al crear el tipo de habitación';
    } finally {
      isLoading.value = false;
    }
  };

  const updateTypeRoom = async (id, typeRoomData) => {
    isLoading.value = true;
    try {
      const response = await api.patch(`/typeroom/${id}`, typeRoomData);
      const index = typeRooms.value.findIndex(t => t._id === id);
      if (index !== -1) {
        typeRooms.value[index] = response.data.typeRoom;
      }
      return response.data.typeRoom;
    } catch (err) {
      error.value = err.message || 'Error al actualizar el tipo de habitación';
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTypeRoom = async (id) => {
    isLoading.value = true;
    try {
      await api.delete(`/typeroom/${id}`);
      typeRooms.value = typeRooms.value.filter(t => t._id !== id);
    } catch (err) {
      error.value = err.message || 'Error al eliminar el tipo de habitación';
    } finally {
      isLoading.value = false;
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return {
    typeRooms,
    isLoading,
    error,
    fetchTypeRooms,
    createTypeRoom,
    updateTypeRoom,
    deleteTypeRoom,
    resetError
  };
});
