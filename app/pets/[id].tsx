import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/petInfo.styles";
import { useEffect, useState } from "react";
import { getVaccine } from "@/services/firebase/vaccineService";


export default function PetInfo() {
  const { id, nome, raca } = useLocalSearchParams();
  const router = useRouter();
  const [vaccines, setVaccines] = useState<any[]>([])

  async function fetchVaccines() {
    try {
      const data = await getVaccine(id as string)
      setVaccines(data)
    } catch (error) {
      console.error("Erro no serviço de busca de vacina", error);
      return;
    }
  }


  useEffect(() => {
    fetchVaccines()
  }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{nome}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => console.log("Editar pet")}>
          <Text>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.petImageWrapper}>
        <Image source={{ uri: "" }} style={styles.petImage} />
      </View>

      <Text style={styles.petName}>{nome}</Text>
      <Text style={styles.petBreed}>{raca}</Text>

      {vaccines.length > 0 ? (
        vaccines.map((vacina) => (
          <View style={styles.vaccineCard} key={vacina.id}>
            <Text style={{ fontWeight: "bold" }}>{vacina.nome}</Text>
            <Text>Aplicada em: {vacina.dataAplicada}</Text>
            <Text>Próxima dose: {vacina.dataProxDose}</Text>
          </View>
        ))
      ) : (<Text style={{ marginTop: 20 }}>Nenhuma Vacina cadastrada ainda</Text>)}


      {/* Botão flutuante para adicionar vacina */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push(`/pets/${id}/newVaccine`)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
