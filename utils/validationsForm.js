const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[a-zA-Z0-9]+$/;
  let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  let regexPhone = /^[0-9]{10}$/;
  let regexPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

  if (!form.user.trim()) {
    errors.user = "El campo 'Usuario' es requerido.";
  } else if (form.user.trim().length < 2) {
    errors.user = "El campo 'Usuario' es demasiado corto.";
  } else if (!regexName.test(form.user.trim())) {
    errors.user = "El campo 'Usuario' solo acepta letras y números.";
  } else if (form.user.trim().length > 15) {
    errors.user = "El campo 'Usuario' es demasiado largo.";
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido.";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto.";
  }

  if (!form.phone.trim()) {
    errors.phone = "El campo 'Teléfono' es requerido.";
  } else if (!regexPhone.test(form.phone.trim())) {
    errors.phone = "El campo 'Teléfono' es incorrecto.";
  }

  // Validación para contraseña y confirmación
  errors = { ...errors, ...validatePasswordFields(form) };

  return errors;
};

const validatePasswordFields = (form) => {
  let errors = {};
  let regexPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

  if (!form.password.trim()) {
    errors.password = "El campo 'Contraseña' es requerido.";
  } else if (!regexPass.test(form.password.trim())) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial (@, #, % o $).";
  }

  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "El campo 'Confirmar Contraseña' es requerido.";
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};

export { validationsForm, validatePasswordFields };
