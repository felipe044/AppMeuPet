import { Alert, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Stack, useRouter } from 'expo-router';
import styles from './styles/newPet.styles';
import { addPet } from "@/services/firebase/petService";
import { useState } from "react";
import { getPet } from "@/services/firebase/petService";

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
        const existingPet = await getPet(nome, raca);
        if (existingPet) {
            Alert.alert(
                "Pet já cadastrado",
                "Já existe um pet com esse nome e raça. Deseja salvar mesmo assim?",
                [
                    { text: "Cancelar", style: "cancel", onPress: ()=>{setNome(''); setRaca('');} },
                    
                    {
                        text: "Continuar",
                        onPress: () => savePet()
                    }
                ]
            );
            return;
        }

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
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.imageContainer}>
                <View style={styles.imageCircle}>
                    <Text>foto do animal</Text>
                </View>
                <TouchableOpacity style={styles.addPhotoButton}>
                    <Text style={styles.addPhotoText} >Adicionar Foto</Text>
                </TouchableOpacity>
            </View>

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
    )
}

export default NewPet; 