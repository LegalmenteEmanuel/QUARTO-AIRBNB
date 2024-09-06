import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, watch } from "vue";
import { useUserStore } from "./user-store";
import { usePropertyStore } from "./property-store";
import Swal from "sweetalert2";

const storedRentIsTrue = localStorage.getItem("rentIsTrue");
const initialRentIsTrue = storedRentIsTrue
  ? JSON.parse(storedRentIsTrue)
  : null;

const storedinfoProperty = localStorage.getItem("rentInfoProperty");
const initialRentInfoProperty = storedinfoProperty
  ? JSON.parse(storedinfoProperty)
  : null;

export const useRentStore = defineStore("rent", () => {
  const userStore = useUserStore();
  const propertyStore = usePropertyStore();
  const rentProperties = ref(null);
  const hositingProperties = ref(null);
  const rentInfoProperty = ref(initialRentInfoProperty);
  const rentIsTrue = ref(initialRentIsTrue);

  watch(rentIsTrue, () => {
    localStorage.setItem("rentIsTrue", JSON.stringify(rentIsTrue.value));
  });

  watch(rentInfoProperty, () => {
    localStorage.setItem(
      "rentInfoProperty",
      JSON.stringify(rentInfoProperty.value)
    );
  });

  const getRentsProperties = async () => {
    try {
      const res = await api({
        url: "/rent/" + userStore.user._id,
        method: "GET",
      });
      console.log(res.data);
      rentProperties.value = [...res.data.rents];
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const getHostingsProperties = async () => {
    try {
      const res = await api({
        url: "/rent/hostings/" + userStore.user._id,
        method: "GET",
      });
      console.log(res.data);
      hositingProperties.value = [...res.data.hostings];
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return {
    getRentsProperties,
    getHostingsProperties,
    rentProperties,
    hositingProperties,
    rentInfoProperty,
    rentIsTrue,
  };
});
