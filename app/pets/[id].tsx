import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles/petInfo.styles";
import { getPetById } from "@/services/firebase/petService";
import { getVaccines } from "@/services/firebase/vaccineService";

export default function PetInfo() {
  const { id, nome: nomeParam, raca: racaParam } = useLocalSearchParams();
  const router = useRouter();

  const [nome, setNome] = useState<string>((nomeParam as string) || "");
  const [raca, setRaca] = useState<string>((racaParam as string) || "");
  const [vaccines, setVaccines] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function load() {
        try {
          const petData = await getPetById(id as string);

          if (isActive && petData) {
            setNome(petData.nome || (nomeParam as string) || "");
            setRaca(petData.raca || (racaParam as string) || "");
          }

          const vaccinesData = await getVaccines(id as string);
          if (isActive) {
            setVaccines(vaccinesData);
          }
        } catch (error) {
          console.log("Erro ao carregar pet:", error);
        }
      }

      load();

      return () => {
        isActive = false;
      };
    }, [id, nomeParam, racaParam])
  );

  function goToNewVaccine() {
    router.push(`/pets/${id}/newVaccine?nome=${nome}&raca=${raca}`);
  }

  function goToEditPet() {
    router.push({
      pathname: `/pets/${id}/editPet`,
      params: { id, nome, raca },
    });
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={{ fontSize: 22 }}>←</Text>
          </TouchableOpacity>

          {/*<Text style={styles.headerTitle}>{nome}</Text>*/}

          <TouchableOpacity style={styles.editButton} onPress={goToEditPet}>
            <Ionicons name="pencil" size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.petName}>{nome}</Text>
        <Text style={styles.petBreed}>{raca}</Text>

        {vaccines.length > 0 ? (
          vaccines.map((vacina) => (
            <View style={styles.vaccineCard} key={vacina.id}>
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: "/vaccines/[id]",
                  params: {
                    id: vacina.id,
                    petId: id, 
                    nome: vacina.nome,
                    dataAplicada: vacina.dataAplicada,
                    dataProxDose: vacina.dataProxDose,
                    obs: vacina.obs,
                  },
                })
                }>
                <Text style={{ fontWeight: "bold" }}>{vacina.nome}</Text>
                <Text>Aplicada em: {vacina.dataAplicada}</Text>
                <Text>Próxima dose: {vacina.dataProxDose}</Text>
                <Text>Obs: {vacina.obs}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyVaccines}>
            <Text style={styles.textEmptyVaccines}>
              Nenhuma vacina cadastrada
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.fab} onPress={goToNewVaccine}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}