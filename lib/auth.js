import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URL from "./api";

export async function createUserAccount({ user, email, phone, password }) {
  const requestBody = {
    user,
    email,
    phone,
    password,
  };

  try {
    const response = await axios.post(
      `${API_URL}/user/crearcuenta`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      email: response.data.email,
      message: response.data.msj,
    };
  } catch (error) {
    if (error.response) {
      return {
        error: error.response.data || "Error en la creación de la cuenta",
      };
    } else if (error.request) {
      return { error: "No se recibió respuesta del servidor" };
    } else {
      return { error: error.message };
    }
  }
}

export async function loginUser({ email, password }) {
  const requestBody = { email, password };

  try {
    const response = await axios.post(
      `${API_URL}/user/movil/login`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Maneja la respuesta exitosa de inicio de sesión
    const userData = {
      id: response.data.id,
      rol: response.data.rol,
      email: response.data.email,
      message: response.data.msj,
    };

    await AsyncStorage.setItem("userEmail", response.data.email);

    await obtenerInfoUser(response.data.email);

    return userData;
  } catch (error) {
    if (error.response) {
      return {
        error: error.response.data || "Error en el inicio de sesión",
      };
    } else if (error.request) {
      return { error: "No se recibió respuesta del servidor" };
    } else {
      return { error: error.message };
    }
  }
}

export async function obtenerInfoUser(email) {
  try {
    const response = await axios.get(
      `${API_URL}/user/movil/obtenerusuario/${email}`
    );
    const userInfo = response.data;

    const domicilio = userInfo.domicilio || {
      ciudad: null,
      municipio: null,
      localidad: null,
      codigoPostal: null,
      direccion: null,
    };

    const userData = {
      id: userInfo._id,
      user: userInfo.user,
      email: userInfo.email,
      imagen: userInfo.img,
      nombres: userInfo.nombres,
      apellidos: userInfo.apellidos,
      phone: userInfo.phone,
      question: userInfo.question_secret,
      reply_secret: userInfo.reply_secret,
      isCreated: userInfo.accountCreated,
      isLoggin: userInfo.isLogginDate,
      feedbackCheck: userInfo.feedbackCheck,
      citaCreated: userInfo.citaCreated,
      domicilio: {
        ciudad: domicilio.ciudad,
        municipio: domicilio.municipio,
        codigoPostal: domicilio.codigoPostal,
        direccion: domicilio.direccion,
      },
    };

    await AsyncStorage.setItem("idUser", JSON.stringify(userData));
    await AsyncStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    return error;
  }
}

export async function updateUserData({ userId, updateData }) {
  try {
    const response = await axios.put(
      `${API_URL}/user/updateuser/${userId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.msj || "Usuario actualizado exitosamente",
      updatedUser: response.data,
    };
  } catch (error) {
    // Manejo de errores en la actualización de usuario
    if (error.response) {
      return {
        success: false,
        error:
          error.response.data.msj ||
          "Error en la solicitud de actualización de usuario.",
      };
    } else if (error.request) {
      return { success: false, error: "No se recibió respuesta del servidor." };
    } else {
      return { success: false, error: error.message };
    }
  }
}

export async function verifyAccount({ email, otp }) {
  const requestBody = { email, otp };

  try {
    const response = await axios.post(
      `${API_URL}/email_verification/verify`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Si la verificación fue exitosa
    if (response.data.verified) {
      return {
        verified: true,
        email: response.data.email,
        message: response.data.msj || "Cuenta verificada exitosamente",
      };
    }

    // Si `verified` no está presente o es `false`, manejamos como error
    return {
      verified: false,
      error: response.data.msj || "Error en la verificación de cuenta",
    };
  } catch (error) {
    if (error.response) {
      return {
        verified: false,
        error:
          typeof error.response.data === "string"
            ? error.response.data
            : "Error en la verificación de cuenta",
      };
    } else if (error.request) {
      return { verified: false, error: "No se recibió respuesta del servidor" };
    } else {
      return { verified: false, error: error.message };
    }
  }
}

export async function forgotPassword({ email, indicator }) {
  const requestBody = {
    email,
    indicator: String(indicator), // Aseguramos que `indicator` se envíe como string
  };

  try {
    const response = await axios.post(
      `${API_URL}/forgot_password`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Retornar directamente la respuesta del backend
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Manejo de errores en la solicitud de recuperación
    if (error.response) {
      return {
        success: false,
        error:
          error.response.data.msj ||
          "Error en la solicitud de recuperación de contraseña.",
      };
    } else if (error.request) {
      return { success: false, error: "No se recibió respuesta del servidor." };
    } else {
      return { success: false, error: error.message };
    }
  }
}

export async function resetPassword({ email, newPassword }) {
  const requestBody = { email, newPassword };

  try {
    const response = await axios.post(
      `${API_URL}/forgot_password/reset`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Manejo de respuesta exitosa
    return {
      success: true,
      message: response.data.msj || "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    // Manejo de errores en el restablecimiento de contraseña
    if (error.response) {
      return {
        success: false,
        error: error.response.data.msj || "Error al restablecer la contraseña",
      };
    } else if (error.request) {
      return { success: false, error: "No se recibió respuesta del servidor" };
    } else {
      return { success: false, error: error.message };
    }
  }
}

export async function buscarPorCodigoPostal(codigoPostal) {
  const url = `http://api.zippopotam.us/MX/${codigoPostal}`;
  try {
    const respuesta = await axios.get(url);
    const datos = respuesta.data;

    // Extraemos información relevante
    const resultado = {
      codigoPostal: datos["post code"],
      pais: datos.country,
      estado: datos.places[0].state,
      lugares: datos.places.map((lugar) => ({
        nombre: lugar["place name"],
        longitud: lugar.longitude,
        latitud: lugar.latitude,
      })),
    };

    return resultado;
  } catch (error) {
    return error;
  }
}
