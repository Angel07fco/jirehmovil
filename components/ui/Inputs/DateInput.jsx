import { useState } from "react";
import { TextInput, View, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DateInput = ({ value, onChangeDate, placeholder }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (currentDate.getDay() === 0) {
      Alert.alert("Día no válido", "No se pueden seleccionar domingos.");
      return;
    }

    setShowPicker(false);
    setDate(currentDate);
    onChangeDate(currentDate.toISOString().split("T")[0]);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          value={date.toISOString().split("T")[0]}
          placeholder={placeholder}
          editable={false}
          className="border border-secondaryBlue text-secondaryBlue rounded-md p-2 w-full text-base"
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};
