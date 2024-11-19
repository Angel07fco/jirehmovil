import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { useConfirmPayment, useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { createPaymentIntent } from "../../lib/pagos";
import { CustomModal } from "../../components/ui/Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Payment({ success, setSuccess, pago }) {
  const { confirmPayment, loading } = useConfirmPayment();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loadingPago, setLoadingPago] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (userEmail) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setShowAuthModal(true); // Mostrar el modal si no está autenticado
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
        setShowAuthModal(true); // Mostrar el modal si hay error en autenticación
      }
    };

    checkAuth();
  }, []);

  // Función para cerrar el modal de autenticación y redirigir al usuario
  const handleModalClose = () => {
    setShowAuthModal(false);
    router.push("/"); // Redirigir al usuario a la página de inicio
  };

  // Función para procesar el pago
  const handlePayment = async () => {
    try {
      setLoadingPago(true);

      // Crear Intent de Pago
      const paymentIntentResponse = await createPaymentIntent({ amount: pago });
      const { clientSecret } = paymentIntentResponse;

      // Inicializar Payment Sheet
      const initSheetResponse = await initPaymentSheet({
        merchantDisplayName: "Veterinaria Jireh",
        paymentIntentClientSecret: clientSecret,
      });

      if (initSheetResponse.error) {
        console.error(
          "Error al inicializar el Payment Sheet:",
          initSheetResponse.error
        );
        setLoadingPago(false);
        return;
      }

      // Mostrar Payment Sheet
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        console.error(
          "Error al mostrar el Payment Sheet:",
          paymentResponse.error
        );
      } else {
        setSuccess(); // Marcar el pago como exitoso
        router.push("/"); // Redirigir a la página principal
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    } finally {
      setLoadingPago(false);
    }
  };

  // Mostrar indicador de carga mientras se verifica la autenticación
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <>
      {/* Modal de autenticación */}
      {isAuthenticated === false && (
        <CustomModal visible={showAuthModal} onClose={handleModalClose}>
          <Text className="text-xl font-semibold mb-4">
            Debes acceder primero
          </Text>
          <TouchableOpacity
            className="bg-secondaryBlue w-full py-3 rounded-lg mt-4"
            onPress={handleModalClose}
          >
            <Text className="text-white text-center font-ralewayExtraBold text-lg font-semibold">
              Ir a la página de inicio
            </Text>
          </TouchableOpacity>
        </CustomModal>
      )}

      {/* Modal de pago solo si el usuario está autenticado */}
      {isAuthenticated === true && (
        <Modal
          isVisible={success}
          onBackButtonPress={() => setSuccess()}
          onBackdropPress={() => setSuccess()}
        >
          <View className="justify-center items-center bg-gray-100 p-6 rounded-xl">
            {loadingPago ? (
              <Text className="text-secondaryBlue text-center font-ralewayExtraBold text-lg font-semibold">
                Procesando la orden de pago...
              </Text>
            ) : (
              <View>
                <TouchableOpacity
                  className={`bg-secondaryBlue w-full py-3 rounded-lg ${
                    loading ? "opacity-50" : "opacity-100"
                  }`}
                  onPress={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-white text-center font-ralewayExtraBold text-lg font-semibold">
                      Confirmar pago
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-4"
                  onPress={() => setSuccess(false)}
                >
                  <Text className="text-blue-500 text-center font-ralewaySemiBold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      )}
    </>
  );
}
