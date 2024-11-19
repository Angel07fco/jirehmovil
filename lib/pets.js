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
      return {
        error: "No se pudieron obtener las mascotas del usuario",
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        error: error.response.data || "Error al obtener mascotas del usuario",
      };
    } else if (error.request) {
      return { error: "No se recibió respuesta del servidor" };
    } else {
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
      return {
        success: false,
        message: error.response.data || "Error al agregar nueva mascota",
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
      return {
        success: false,
        message: error.response.data || "Error al actualizar la mascota",
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
