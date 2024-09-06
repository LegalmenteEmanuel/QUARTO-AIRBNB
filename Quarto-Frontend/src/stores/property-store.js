import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref, watch } from "vue";
import { useUserStore } from "./user-store";
import Stripe from "stripe";
import Swal from "sweetalert2";

const storedPropertyBuy = localStorage.getItem("propertyBuy");
const initialPropertyBuy = storedPropertyBuy
  ? JSON.parse(storedPropertyBuy)
  : null;

const storedDate = localStorage.getItem("dates");
const initialDates = storedDate ? JSON.parse(storedDate) : null;

export const usePropertyStore = defineStore("property", () => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const properties = ref([]);
  const reviews = ref(null);
  const userStore = useUserStore();
  const propertyrent = ref(null);
  const pucharsedProperty = ref(initialPropertyBuy);
  const url = ref(null);
  const dates = ref(initialDates);
  const InfoProperty = ref(null);

  watch(dates, () => {
    localStorage.setItem("dates", JSON.stringify(dates.value));
  });

  watch(pucharsedProperty, () => {
    localStorage.setItem(
      "propertyBuy",
      JSON.stringify(pucharsedProperty.value)
    );
  });

  const addProperty = async (formData) => {
    try {
      const response = await api({
        url: `/property/${userStore.user._id}`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add property:", error);
      throw error;
    }
  };

  const getProperties = async () => {
    try {
      const res = await api({
        url: "/property/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      properties.value = [...res.data.properties];
    } catch (error) {}
  };

  const getPropertyById = async (id) => {
    try {
      const res = await api({
        url: "/property/" + id,
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      InfoProperty.value = res.data.property;
    } catch (error) {
      console.log(error);
    }
  };

  const getPropertiesReviews = async (id) => {
    try {
      const res = await api({
        url: "/review/" + id,
        method: "GET",
      });
      reviews.value = [...res.data.reviews];
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

  const propertyRent = async () => {
    try {
      if (userStore.user.properties.includes(propertyrent.value._id)) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Ya tienes alquila esta propiedad",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                product_data: {
                  name: propertyrent.value.name,
                  description: propertyrent.value.description,
                },
                currency: "usd",
                unit_amount: Math.round(propertyrent.value.price) * 100, //Se especifica en centavos
              },
              quantity: 1,
            },
          ],
          mode: "payment", //Payment | Subscription
          success_url: process.env.FRONT_URI + "/success",
          cancel_url: process.env.FRONT_URI + "/cancel",
        });

        url.value = session.url;
        pucharsedProperty.value = propertyrent.value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPucharsedProperty = async () => {
    try {
      await api({
        url: "/property/buy/" + pucharsedProperty.value._id,
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          dates: dates.value,
        },
      });

      localStorage.setItem("propertyBuy", "");
      userStore.refreshToken();
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  return {
    getProperties,
    getPropertiesReviews,
    getPropertyById,
    propertyRent,
    addPucharsedProperty,
    propertyrent,
    url,
    dates,
    properties,
    reviews,
    InfoProperty,
    addProperty,
  };
});
