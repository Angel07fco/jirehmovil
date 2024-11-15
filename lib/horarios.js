import axios from "axios";
import API_URL from "./api";

// Función para obtener los horarios disponibles del médico
export async function getHorariosMedico(idMedico, fecha) {
  try {
    const response = await axios.get(
      `${API_URL}/horario/${idMedico}/${fecha}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los horarios del médico:", error);
    return { error: error.response?.data?.message || error.message };
  }
}

// Función para obtener las citas ya agendadas para ese día
export async function getCitasAgendadas(idMedico, fecha) {
  try {
    const response = await axios.get(
      `${API_URL}/cita/citas/${idMedico}/${fecha}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las citas agendadas:", error);
    return { error: error.response?.data?.message || error.message };
  }
}

// Función principal que obtiene los horarios disponibles después de eliminar los ocupados
export async function obtenerHorariosDisponibles(idMedico, fecha) {
  try {
    // 1. Obtener horarios disponibles del médico
    const horariosDisponibles = await getHorariosMedico(idMedico, fecha);

    if (
      !horariosDisponibles ||
      !horariosDisponibles.horariosDisponibles ||
      horariosDisponibles.horariosDisponibles.length === 0
    ) {
      return "El médico no tiene horarios disponibles para esa fecha";
    }

    // 2. Obtener las citas ya agendadas para esa fecha
    const citasAgendadas = await getCitasAgendadas(idMedico, fecha);

    if (!citasAgendadas || citasAgendadas.length === 0) {
      // Si no hay citas agendadas, retornamos todos los horarios disponibles
      return horariosDisponibles.horariosDisponibles;
    }

    // 3. Comparar los horarios disponibles con los ocupados
    const horariosOcupados = citasAgendadas.map((cita) => cita.hora); // Extraemos las horas ocupadas

    // Filtrar los horarios disponibles excluyendo los que están ocupados
    const horariosLibres = horariosDisponibles.horariosDisponibles.filter(
      (hora) => !horariosOcupados.includes(hora)
    );

    // 4. Retornar los horarios libres
    return horariosLibres;
  } catch (error) {
    console.error("Error al obtener los horarios disponibles:", error);
    return { error: error.message };
  }
}
