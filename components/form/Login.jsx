import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { InputPassword } from "../ui/Inputs/InputPassword";
import ButtonGroup from "../ui/Buttons/ButtonGroup";
import { SubTitleText } from "../ui/Text";
import { Link, useRouter } from "expo-router";
import { loginUser } from "../../lib/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("loading");
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const validationErrors = {};

    // Validación del correo electrónico
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!formData.email.trim()) {
      validationErrors.email = "El campo 'Correo electrónico' es requerido.";
    } else if (!emailRegex.test(formData.email.trim())) {
      validationErrors.email =
        "El formato del correo electrónico es incorrecto.";
    }

    // Validación de la contraseña
    if (!formData.password.trim()) {
      validationErrors.password = "El campo 'Contraseña' es requerido.";
    }

    // Si no hay errores, intenta iniciar sesión
    if (Object.keys(validationErrors).length === 0) {
      setModalStatus("loading");
      setModalMessage("Iniciando sesión...");
      setShowModal(true);

      try {
        const response = await loginUser(formData);

        if (response.email) {
          setModalStatus("success");
          setModalMessage(`¡Bienvenido! ${response.message}`);

          // Redirige a Home después de 2 segundos
          setTimeout(() => {
            setShowModal(false);
            router.push("/"); // Redirige al Home
          }, 2000);
        } else if (
          response.error &&
          response.error.includes(
            "El correo electrónico aún no se ha verificado"
          )
        ) {
          setModalStatus("error");
          setModalMessage(response.error);

          // Redirige a confirmar cuenta después de 2 segundos
          setTimeout(() => {
            setShowModal(false);
            router.push({
              pathname: "/auth/confirmarCuenta",
              params: { email: formData.email },
            });
          }, 2000);
        } else {
          setModalStatus("error");
          setModalMessage(response.error || "Error desconocido");
          setFormData({ email: "", password: "" });
        }
      } catch (error) {
        setModalStatus("error");
        setModalMessage("Ocurrió un error al intentar iniciar sesión.");
        setFormData({ email: "", password: "" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <View className="w-full">
      <ButtonGroup />
      <View>
        <View>
          <Label>Correo electrónico</Label>
          <Input
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && <Text className="text-red-500">{errors.email}</Text>}
        </View>

        <View className="mt-4">
          <Label>Contraseña</Label>
          <InputPassword
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Ingrese su contraseña"
            isPassword={true}
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}
        </View>

        {/* Enlace para recuperar la contraseña */}
        <View className="mt-1 flex items-end">
          <Link href="/auth/forgotScreen">
            <SubTitleText>Recuperar contraseña</SubTitleText>
          </Link>
        </View>

        <View className="mt-4">
          <Button onPress={handleSubmit}>Iniciar sesión</Button>
        </View>
      </View>

      <CustomModal
        visible={showModal}
        onClose={closeModal}
        status={modalStatus}
      >
        {modalStatus === "loading" ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text className="text-xl font-semibold mb-4">{modalMessage}</Text>
        )}
      </CustomModal>
    </View>
  );
};

export default Login;
