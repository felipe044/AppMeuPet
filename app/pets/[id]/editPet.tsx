import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/editPet.styles";
import { updatePet } from "@/services/firebase/petService";

export default function EditPet() {
  const { id, nome: nomeParam, raca: racaParam } = useLocalSearchParams();
  const router = useRouter();

  // Estados iniciam com os valores recebidos
  const [nome, setNome] = useState(nomeParam as string);
  const [raca, setRaca] = useState(racaParam as string);

  async function salvar() {
    if (!nome.trim() || !raca.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await updatePet(id as string, { nome, raca });

      Alert.alert("Sucesso", "Pet atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.log("Erro ao atualizar pet:", error);
      Alert.alert("Erro", "Não foi possível atualizar o pet.");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <Text style={styles.title}>Editar Pet</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do pet"
        />

        <Text style={styles.label}>Raça:</Text>
        <TextInput
          style={styles.input}
          value={raca}
          onChangeText={setRaca}
          placeholder="Raça do pet"
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvar}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
