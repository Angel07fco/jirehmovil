import axios from "axios";
import API_URL from "./api";

export async function feedbackPostCita(
  feedbackData,
  citaIdParaFeedback,
  dataF
) {
  try {
    const feedbackResponse = await axios.post(
      `${API_URL}/post_cita`,
      feedbackData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updateResponse = await axios.put(
      `${API_URL}/cita/feedback/${citaIdParaFeedback}`,
      dataF,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: "¡Gracias por tu feedback!",
    };
  } catch (error) {
    if (error.response) {
      console.error("Error al agregar feedback:", error.response.data);
      return {
        success: false,
        message: error.response.data || "Error al enviar feedback",
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return {
        success: false,
        message: "No se recibió respuesta del servidor",
      };
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
