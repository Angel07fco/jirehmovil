import axios from "axios";
import API_URL from "./api";

export async function getServices() {
  try {
    const response = await axios.get(`${API_URL}/services`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return { error: error.response?.data?.message || error.message };
  }
}
