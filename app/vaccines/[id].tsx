import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import styles from "./styles/editVaccine";

type VaccineParams = {
  id: string;
  nome: string;
  dataaplicada: string;
  dataprox: string;
  obs: string;
};

export default function EditVaccine() {
  const { id, nome, dataaplicada, dataprox, obs } = useLocalSearchParams<VaccineParams>();

  const [novoNome, setNovoNome] = useState(nome || "");
  const [novaDataAplicada, setNovaDataAplicada] = useState(dataaplicada || "");
  const [novaProxDose, setNovaProxDose] = useState(dataprox || "");
  const [novaObs, setNovaObs] = useState(obs || "");


  async function saveModifyVaccine(){

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
        onChangeText={setNovaDataAplicada}
        placeholder="DD/MM/AAAA"
      />

      <Text style={styles.label}>Próxima Dose</Text>
      <TextInput
        style={styles.input}
        value={novaProxDose}
        onChangeText={setNovaProxDose}
        placeholder="DD/MM/AAAA"
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={styles.input}
        value={novaObs}
        onChangeText={setNovaObs}
        placeholder="Digite observações..."
        multiline
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}
