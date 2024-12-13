import axios from "axios";
import API_URL from "./api";

export async function feedbackFunction(feedbackData) {
  try {
    await axios.post(`${API_URL}/feedback`, feedbackData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: "¡Gracias por tu feedback!",
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data || "Error al enviar feedback",
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
