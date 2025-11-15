import { Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { View, Text } from "react-native";
import { Stack, useRouter } from 'expo-router';
import styles from './styles/newPet.styles';
import { addPet } from "@/services/firebase/petService";
import { useState } from "react";
import { getPetByName } from "@/services/firebase/petService";

function NewPet() {
    const [nome, setNome] = useState("")
    const [raca, setRaca] = useState("")
    const router = useRouter()

    function validateFields() {
        if (!nome.trim()) {
            Alert.alert("Campo obrigatório", "Informe o nome do animal.");
            return false;
        }
        if (!raca.trim()) {
            Alert.alert("Campo obrigatório", "Informe a raça do animal.");
            return false;
        }
        return true;
    }

    async function validatePet() {
        if (!validateFields()) {
            return;
        }
        const existingPet = await getPetByName(nome);


        savePet();
    }

    async function savePet() {
        try {
            await addPet({ nome, raca });
            Alert.alert("Sucesso", "Pet cadastrado com sucesso!");
            router.push("/pets");
        } catch (error) {
            console.log("Erro ao tentar salvar pet", error);
        }
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Stack.Screen options={{ headerShown: false }} />

                    <Text style={styles.label} >Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do animal"
                        value={nome}
                        onChangeText={setNome}
                    >
                    </TextInput>

                    <Text style={styles.label}>Raça:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a raça do animal"
                        value={raca}
                        onChangeText={setRaca}
                    ></TextInput>

                    <TouchableOpacity style={styles.saveButton} onPress={validatePet}>
                        <Text style={styles.saveButtonText} >Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default NewPet; 