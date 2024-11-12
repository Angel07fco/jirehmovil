import axios from "axios";
import API_URL from "./api";

export async function getPetsByUser(userId) {
  try {
    const response = await axios.get(`${API_URL}/pet/movil/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const pets = response.data;
      return pets;
    } else {
      console.error("Error en la solicitud:", response.status);
      return {
        error: "No se pudieron obtener las mascotas del usuario",
      };
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Error al obtener mascotas del usuario:",
        error.response.data
      );
      return {
        error: error.response.data || "Error al obtener mascotas del usuario",
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return { error: "No se recibió respuesta del servidor" };
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return { error: error.message };
    }
  }
}

export async function addNewPet(data) {
  try {
    const response = await axios.post(`${API_URL}/pet/newpet`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.msj,
      };
    } else {
      return {
        success: false,
        message: "No se pudo agregar la mascota",
      };
    }
  } catch (error) {
    if (error.response) {
      console.error("Error al agregar nueva mascota:", error.response.data);
      return {
        success: false,
        message: error.response.data || "Error al agregar nueva mascota",
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

export async function updatePet(idMascota, data) {
  try {
    const response = await axios.put(
      `${API_URL}/pet/actualizar/${idMascota}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.msj || "Mascota actualizada correctamente",
      };
    } else {
      return {
        success: false,
        message: "No se pudo actualizar la mascota",
      };
    }
  } catch (error) {
    if (error.response) {
      console.error("Error al actualizar la mascota:", error.response.data);
      return {
        success: false,
        message: error.response.data || "Error al actualizar la mascota",
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
