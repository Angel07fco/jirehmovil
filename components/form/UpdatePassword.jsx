import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { InputPassword } from "../ui/Inputs/InputPassword";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { validatePasswordFields } from "../../utils/validationsForm";
import { TitleText } from "../ui/Text";
import { resetPassword } from "../../lib/auth";
import { useRouter } from "expo-router";

const UpdatePassword = ({ email }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("loading");

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validatePasswordFields(formData);

    if (Object.keys(validationErrors).length === 0) {
      setModalStatus("loading");
      setModalMessage("Actualizando contraseña...");
      setShowModal(true);

      const result = await resetPassword({
        email,
        newPassword: formData.password,
      });

      if (result.error) {
        setModalStatus("error");
        setModalMessage(`Error: ${result.error}`);
      } else {
        setModalStatus("success");
        setModalMessage(result.message);
        setTimeout(() => {
          setShowModal(false);
          router.push("/atuh/loginScreen");
        }, 1500);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <View className="w-full">
      <View>
        <View>
          <TitleText>Actualizar contraseña</TitleText>
          <Text
            className="font-bold text-base mb-4"
            style={{ textDecorationLine: "underline" }}
          >
            {email}
          </Text>
          <Label>Nueva Contraseña</Label>
          <InputPassword
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Ingrese su nueva contraseña"
            isPassword={true}
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}
        </View>

        <View className="mt-4">
          <Label>Confirmar Nueva Contraseña</Label>
          <InputPassword
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            placeholder="Confirme su nueva contraseña"
            isPassword={true}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500">{errors.confirmPassword}</Text>
          )}
        </View>

        <View className="mt-6">
          <Button onPress={handleSubmit}>Actualizar Contraseña</Button>
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

export default UpdatePassword;
