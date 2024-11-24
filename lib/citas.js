import moment from "moment";
import axios from "axios";
import API_URL from "./api";

export async function getCitasProximas(idUsuario) {
  try {
    const response = await axios.get(`${API_URL}/cita/${idUsuario}`);

    const ahora = moment();
    const citas = response.data;

    const citasProximas = citas.filter((cita) => {
      const citaInicio = moment(
        `${cita.fecha} ${cita.hora.split("-")[0]}`,
        "DD-MM-YYYY HH:mm"
      );
      return citaInicio.isAfter(ahora);
    });

    return {
      success: true,
      citasProximas,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data || "Error al obtener citas en vivo y próximas",
    };
  }
}

export async function getCitasEnVivo(idUsuario) {
  const horaActual = moment().format("HH:mm");

  try {
    const response = await axios.get(
      `${API_URL}/cita/envivo/${idUsuario}/${horaActual}`
    );
    if (response.data && Array.isArray(response.data)) {
      const citasEnVivo = response.data;
      return {
        success: true,
        citasEnVivo,
      };
    } else {
      throw new Error("No se encontraron citas en vivo");
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Error al obtener citas en vivo",
    };
  }
}

export async function getCitasQueYaOpine(idUsuario) {
  try {
    const response = await axios.get(`${API_URL}/cita/${idUsuario}`);

    const ahora = moment();
    const citas = response.data;

    const citasYaOpinadas = citas.filter((cita) => {
      const citaFin = moment(
        `${cita.fecha} ${cita.hora.split("-")[1]}`,
        "DD-MM-YYYY HH:mm"
      );
      return citaFin.isBefore(ahora) && cita.opinionUsuario;
    });

    return {
      success: true,
      citasYaOpinadas,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data || "Error al obtener citas en vivo y próximas",
    };
  }
}

export async function getCitasPorOpinar(idUsuario) {
  try {
    const response = await axios.get(`${API_URL}/cita/${idUsuario}`);

    const ahora = moment();
    const citas = response.data;

    const citasRealizadas = citas.filter((cita) => {
      const citaFin = moment(
        `${cita.fecha} ${cita.hora.split("-")[1]}`,
        "DD-MM-YYYY HH:mm"
      );
      return citaFin.isBefore(ahora) && !cita.opinionUsuario;
    });

    return {
      success: true,
      citasRealizadas,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data || "Error al obtener citas en vivo y próximas",
    };
  }
}

export async function addNewCita(data) {
  try {
    const response = await axios.post(`${API_URL}/cita/newcita`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: response.data.msj,
      idCita: response.data.id,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.msj || "Error al agendar nueva cita",
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
