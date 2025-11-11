import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";

// 🔹 Aqui definimos a tipagem dos parâmetros da rota
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
    <View style={{ padding: 20 }}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text>Nome:</Text>
      <TextInput
        value={novoNome}
        onChangeText={setNovoNome}
        placeholder={nome}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Data Aplicada:</Text>
      <TextInput
        value={novaDataAplicada}
        onChangeText={setNovaDataAplicada}
        placeholder={dataaplicada}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Próxima Dose:</Text>
      <TextInput
        value={novaProxDose}
        onChangeText={setNovaProxDose}
        placeholder={dataprox}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Observações:</Text>
      <TextInput
        value={novaObs}
        onChangeText={setNovaObs}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <TouchableOpacity onPress={saveModifyVaccine}>
        <Text>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}
