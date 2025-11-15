import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import styles from "./styles/editVaccine";
import { updateVaccine } from "@/services/firebase/vaccineService";

type VaccineParams = {
  id: string; 
  petId: string;
  nome: string;
  dataAplicada: string;
  dataProxDose: string;
  obs: string;
};

export default function EditVaccine() {
  const router = useRouter();
  const { id, petId, nome, dataAplicada, dataProxDose, obs } = useLocalSearchParams<VaccineParams>();
  console.log("PARAMS RECEBIDOS:", useLocalSearchParams());

  const [novoNome, setNovoNome] = useState(nome || "");
  const [novaDataAplicada, setNovaDataAplicada] = useState(dataAplicada || "");
  const [novaProxDose, setNovaProxDose] = useState(dataProxDose || "");
  const [novaObs, setNovaObs] = useState(obs || "");

  function formatDate(value: string) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, "$1/$2");
    }

    return value;
  }

  function validateFields() {
    if (!novoNome) {
      Alert.alert("Campo obrigatório", "Informe o nome da vacina.");
      return false;
    }
    if (!novaDataAplicada) {
      Alert.alert("Campo obrigatório", "Informe a data da aplicação.");
      return false;
    }
    if (!novaProxDose) {
      Alert.alert("Campo obrigatório", "Informe a data da próxima dose.");
      return false;
    }
    return true;
  }

  

  async function saveModifyVaccine() {

    if (!validateFields()) {
      return;
    }
    try {
      await updateVaccine(petId as string, id as string, {
        nome: novoNome,
        dataAplicada: novaDataAplicada,
        dataProxDose: novaProxDose,
        obs: novaObs,
      });

      alert("Vacina atualizada!");
      router.back();
    } catch (error) {
      console.log("Erro ao atualizar vacina:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Editar Vacina</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={novoNome}
        onChangeText={setNovoNome}
        placeholder="Nome da vacina"
      />

      <Text style={styles.label}>Data Aplicada</Text>
      <TextInput
        style={styles.input}
        value={novaDataAplicada}
        //onChangeText={setNovaDataAplicada}
        placeholder="DD/MM/AAAA"
        onChangeText={(text) => setNovaDataAplicada(formatDate(text))}
      />

      <Text style={styles.label}>Próxima Dose</Text>
      <TextInput
        style={styles.input}
        value={novaProxDose}
        placeholder="DD/MM/AAAA"
        onChangeText={(text) => setNovaProxDose(formatDate(text))}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={styles.input}
        value={novaObs}
        onChangeText={setNovaObs}
        placeholder="Digite observações..."
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveModifyVaccine}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}
