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

  console.log(requestBody);

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

    // Maneja la respuesta exitosa
    return {
      email: response.data.email,
      message: response.data.msj,
    };
  } catch (error) {
    // Manejo de errores
    if (error.response) {
      console.error("Error al crear la cuenta:", error.response.data);
      return {
        error: error.response.data || "Error en la creación de la cuenta",
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
    // Manejo de errores en el inicio de sesión
    if (error.response) {
      console.error("Error al iniciar sesión:", error.response.data);
      return {
        error: error.response.data || "Error en el inicio de sesión",
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

export async function obtenerInfoUser(email) {
  try {
    const response = await axios.get(
      `${API_URL}/user/movil/obtenerusuario/${email}`
    );
    const userInfo = response.data;

    const userData = {
      id: userInfo._id,
      user: userInfo.user,
      email: userInfo.email,
      imagen: userInfo.img,
    };

    console.log(userInfo.img);

    await AsyncStorage.setItem("idUser", JSON.stringify(userData));
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
  }
}

export async function verifyAccount({ email, otp }) {
  const requestBody = { email, otp };

  console.log("Verificando cuenta con:", requestBody); // Verificación de los datos enviados

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

    console.log("Respuesta de verificación:", response.data);

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
    // Manejo de errores en la verificación
    if (error.response) {
      console.error("Error en la verificación de cuenta:", error.response.data);

      // Manejo de errores según el mensaje recibido
      return {
        verified: false,
        error:
          typeof error.response.data === "string"
            ? error.response.data
            : "Error en la verificación de cuenta",
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return { verified: false, error: "No se recibió respuesta del servidor" };
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return { verified: false, error: error.message };
    }
  }
}

export async function forgotPassword({ email, indicator }) {
  const requestBody = {
    email,
    indicator: String(indicator), // Aseguramos que `indicator` se envíe como string
  };

  console.log(
    "email: " + email + ", indicator (string): " + requestBody.indicator
  );

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

    // Imprime en consola la respuesta completa del backend
    console.log("Respuesta del backend:", response.data);

    // Retornar directamente la respuesta del backend
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Manejo de errores en la solicitud de recuperación
    if (error.response) {
      console.error(
        "Error en la solicitud de recuperación de contraseña:",
        error.response.data.msj
      );
      return {
        success: false,
        error:
          error.response.data.msj ||
          "Error en la solicitud de recuperación de contraseña.",
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return { success: false, error: "No se recibió respuesta del servidor." };
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return { success: false, error: error.message };
    }
  }
}

export async function resetPassword({ email, newPassword }) {
  const requestBody = { email, newPassword };

  console.log(email, newPassword);

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

    console.log("Respuesta de restablecimiento de contraseña:", response.data);

    // Manejo de respuesta exitosa
    return {
      success: true,
      message: response.data.msj || "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    // Manejo de errores en el restablecimiento de contraseña
    if (error.response) {
      console.error("Error al restablecer la contraseña:", error.response.data);
      return {
        success: false,
        error: error.response.data.msj || "Error al restablecer la contraseña",
      };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      return { success: false, error: "No se recibió respuesta del servidor" };
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      return { success: false, error: error.message };
    }
  }
}
