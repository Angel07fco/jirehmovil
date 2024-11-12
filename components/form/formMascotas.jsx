import React, { useState } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { arraypets } from "../../helpers/ArrayPets";
import { addNewPet } from "../../lib/pets";
import { Input } from "../ui/Inputs/Input";
import { Button } from "../ui/Buttons/Button";
import { Label } from "../ui/Label";

const FormAgregarMascota = ({ onClose, userId }) => {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [especie, setEspecie] = useState("");
  const [tamano, setTamano] = useState("");
  const [raza, setRaza] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [genero, setGenero] = useState("");
  const [peso, setPeso] = useState("");

  // Estado para manejar errores
  const [errors, setErrors] = useState({});

  // Validación de campos
  const validateFields = () => {
    const newErrors = {};
    if (!categoria) newErrors.categoria = "La categoría es obligatoria.";
    if (!especie) newErrors.especie = "La especie es obligatoria.";
    if (!tamano) newErrors.tamano = "El tamaño es obligatorio.";
    if (!raza) newErrors.raza = "La raza es obligatoria.";
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!age || isNaN(age))
      newErrors.age = "La edad es obligatoria y debe ser numérica.";
    if (!genero) newErrors.genero = "El género es obligatorio.";
    if (!peso || isNaN(peso))
      newErrors.peso = "El peso es obligatorio y debe ser numérico.";
    setErrors(newErrors);

    // Retorna `true` si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const data = {
        categoria,
        especie,
        tamano,
        raza,
        name: name.trim(),
        age,
        genero,
        peso,
        img: "https://res.cloudinary.com/dl8odylct/image/upload/v1710824019/jireh/animaldefault_khthes.jpg",
        userId,
      };

      const result = await addNewPet(data);
      if (result.success) {
        Alert.alert("Éxito", result.message);
        onClose();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al agregar la mascota");
    } finally {
      setLoading(false);
    }
  };

  const especieOptions =
    arraypets.find((item) => item.categoria === categoria)?.especies || [];

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Text className="mb-4 text-lg font-semibold">
        Seleccione una Categoría
      </Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(value) => {
          setCategoria(value);
          setEspecie("");
        }}
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {arraypets.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.categoria}
            value={item.categoria}
          />
        ))}
      </Picker>
      {errors.categoria && (
        <Text className="text-red-500 text-sm mt-1">{errors.categoria}</Text>
      )}

      <Text className="mb-4 text-lg font-semibold">Seleccione una Especie</Text>
      <Picker
        selectedValue={especie}
        onValueChange={(value) => setEspecie(value)}
        enabled={especieOptions.length > 0}
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Picker.Item label="Selecciona una especie" value="" />
        {especieOptions.map((item, index) => (
          <Picker.Item key={index} label={item.name} value={item.name} />
        ))}
      </Picker>
      {errors.especie && (
        <Text className="text-red-500 text-sm mt-1">{errors.especie}</Text>
      )}

      <Label>Tamaño</Label>
      <Picker
        selectedValue={tamano}
        onValueChange={(value) => setTamano(value)}
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Picker.Item label="Selecciona un tamaño" value="" />
        <Picker.Item label="Pequeño" value="Pequeño" />
        <Picker.Item label="Medio" value="Medio" />
        <Picker.Item label="Grande" value="Grande" />
        <Picker.Item label="Gigante" value="Gigante" />
      </Picker>
      {errors.tamano && (
        <Text className="text-red-500 text-sm mt-1">{errors.tamano}</Text>
      )}

      <Label>Raza</Label>
      <Input
        placeholder="Raza"
        value={raza}
        onChangeText={setRaza}
        style="mb-4"
      />
      {errors.raza && (
        <Text className="text-red-500 text-sm mt-1">{errors.raza}</Text>
      )}

      <Label>Nombres</Label>
      <Input
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style="mb-4"
      />
      {errors.name && (
        <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
      )}

      <Label>Edad</Label>
      <Input
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style="mb-4"
      />
      {errors.age && (
        <Text className="text-red-500 text-sm mt-1">{errors.age}</Text>
      )}

      <Text className="mb-4 text-lg font-semibold">Seleccione el Género</Text>
      <Picker
        selectedValue={genero}
        onValueChange={setGenero}
        style={{
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Picker.Item label="Selecciona un Género" value="" />
        <Picker.Item label="Macho" value="Macho" />
        <Picker.Item label="Hembra" value="Hembra" />
      </Picker>
      {errors.genero && (
        <Text className="text-red-500 text-sm mt-1">{errors.genero}</Text>
      )}

      <Label>Peso</Label>
      <Input
        placeholder="Peso (en kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        style="mb-4"
      />
      {errors.peso && (
        <Text className="text-red-500 text-sm mt-1">{errors.peso}</Text>
      )}

      <Button onPress={handleSubmit} style="mt-4">
        {loading ? "Cargando..." : "Agregar Mascota"}
      </Button>

      {/* Botón de Cancelar usando el componente Button */}
      <Button onPress={onClose} style="bg-red-500 mt-4">
        Cancelar
      </Button>
    </ScrollView>
  );
};

export default FormAgregarMascota;
