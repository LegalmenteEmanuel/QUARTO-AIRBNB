import { Notify } from "quasar";

export const useNotify = () => {
  const showNotify = (message = "Error de servidor", color = "negative") => {
    Notify.create({
      message,
      color,
    });
  };

  const errorNotify = (message = "Error de servidor") => {
    Notify.create({
      message,
      color: "red",
      icon: "report_problem",
    });
  };
  const successNotify = (message = "Error de servidor") => {
    Notify.create({
      message,
      color: "green",
      icon: "mdi-check-bold",
    });
  };

  return {
    showNotify,
    successNotify,
    errorNotify,
  };
};
