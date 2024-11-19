import axios from "axios";
import API_URL from "./api";

export async function createPaymentIntent(data) {
  try {
    const response = await axios.post(`${API_URL}/payments/intents`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.msj || "Error al al crear un intent payment",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No se recibió respuesta del servidor",
      };
    } else {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
