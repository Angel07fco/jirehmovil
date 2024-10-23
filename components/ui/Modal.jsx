import { View, Modal } from "react-native";
import { Button } from "./Buttons/Button";

export const CustomModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-600 bg-opacity-75">
        <View className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
          {children}
          <View className="mt-4">
            <Button onPress={onClose}>Cerrar</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
