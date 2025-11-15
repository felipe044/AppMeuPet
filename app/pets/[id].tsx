import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import styles from "./styles/petInfo.styles";
import React, { useState } from "react";
import { getVaccine } from "@/services/firebase/vaccineService";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { uploadImageCloudinary } from "@/services/firebase/uploadService";
import { updatePetImage, getPetPhoto } from "@/services/firebase/petService";
import Constants from "expo-constants";
console.log("Cloudinary config:", Constants.expoConfig?.extra);

export default function PetInfo() {
  const { id, nome, raca } = useLocalSearchParams();
  const router = useRouter();

  const [vaccines, setVaccines] = useState<any[]>([]);
  const [image, setImage] = useState<string | null>(null);

  // PROCESSA A IMAGEM FINAL
async function processImage(result: ImagePicker.ImagePickerAsset) {
  try {
    if (!result.base64) {
      alert("Erro: imagem não veio em base64.");
      return;
    }

    const url = await uploadImageCloudinary(result.base64);

    console.log("💥 URL Cloudinary retornada:", url);  // <---- AQUI

    await updatePetImage(id as string, url);

    setImage(url);

  } catch (error) {
    console.error("Erro ao salvar foto:", error);
  }
}


  async function chooseCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão negada para a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      await processImage(result.assets[0]);
    }
  }


  async function chooseGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      await processImage(result.assets[0]);
    }
  }


  function handleImagePress() {
    Alert.alert(
      "Selecionar imagem",
      "Escolha uma opção",
      [
        { text: "Tirar Foto", onPress: chooseCamera },
        { text: "Escolher da Galeria", onPress: chooseGallery },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  }

  // CARREGAMENTO INICIAL
  useFocusEffect(
    React.useCallback(() => {
      async function load() {
        const url = await getPetPhoto(id as string);
        if (url) setImage(url);

        const vaccinesData = await getVaccine(id as string);
        setVaccines(vaccinesData);
      }
      load();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{nome}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} />
        </TouchableOpacity>
      </View>

      {/* FOTO */}
      <View style={styles.petImageWrapper}>
        <TouchableOpacity onPress={handleImagePress} style={styles.petImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.petImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="camera-outline" size={40} color="#888" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.petName}>{nome}</Text>
      <Text style={styles.petBreed}>{raca}</Text>

      {/* VACINAS */}
      {vaccines.length > 0 ? (
        vaccines.map((vacina) => (
          <View style={styles.vaccineCard} key={vacina.id}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/vaccines/[id]",
                  params: vacina,
                })
              }
            >
              <Text style={{ fontWeight: "bold" }}>{vacina.nome}</Text>
              <Text>Aplicada em: {vacina.dataAplicada}</Text>
              <Text>Próxima dose: {vacina.dataProxDose}</Text>
              <Text>Obs: {vacina.obs}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.emptyVaccines}>
          <Text style={styles.textEmptyVaccines}>Nenhuma Vacina cadastrada</Text>
        </View>
      )}

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          router.push(`/pets/${id}/newVaccine?nome=${nome}&raca=${raca}`)
        }
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
