import axios from "axios";
import API_URL from "./api";

export async function getMedicos() {
  try {
    const response = await axios.get(`${API_URL}/veterinario`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || error.message };
  }
}
