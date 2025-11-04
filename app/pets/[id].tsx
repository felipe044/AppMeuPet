import { View, Text, TouchableOpacity, Image } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/petInfo.styles";

export default function PetInfo() {
  const { id, nome, raca } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text>{"<"}</Text>
        </TouchableOpacity>
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

      {/* Card de exemplo de vacina */}
      <View style={styles.vaccineCard}>
        <Text style={{ fontWeight: "bold" }}>Raiva</Text>
        <Text>13 de abril de 2024</Text>
        <Text>Próxima dose: 13 de abril de 2025</Text>
      </View>

      {/* Botão flutuante para adicionar vacina */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log("Adicionar vacina")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
