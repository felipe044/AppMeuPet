import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import { useState, useEffect } from "react"
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { addVacine } from "@/services/firebase/vaccineService";
import styles from "./styles/newVaccine.styles";

function NewVaccine() {
    const { id, nome, raca } = useLocalSearchParams()
    const router = useRouter()

    const [nomeVacina, setNomeVacina] = useState("")
    const [dataAplicada, setDataAplicada] = useState("")
    const [dataProxDose, setDataProxDose] = useState("")
    const [obs, setObs] = useState("")

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
        if (!nomeVacina) {
            Alert.alert("Campo obrigatório", "Informe o nome da vacina.");
            return false;
        } else if (!dataAplicada) {
            Alert.alert("Campo obrigatório", "Informe a data da aplicação")
            return false;
        } else if (!dataProxDose) {
            Alert.alert("Campo obrigatório", "Informe a data da próxima dose")
            return false;
        }
        return true
    }

    async function saveVaccine() {
        if (!validateFields()) {
            return;
        }

        const dataVaccine = {
            nome: nomeVacina,
            dataAplicada: dataAplicada,
            dataProxDose: dataProxDose,
            obs: obs || ""
        }

        try {
            console.log("ID do pet:", id);
            console.log("Dados enviados:", dataVaccine);
            const docId = await addVacine(id as string, dataVaccine);
            console.log("ID da vacina criada:", docId);

            Alert.alert("Sucesso", "Vacina cadastrada!");
            router.back();
        } catch (error) {
            console.error("Erro ao tentar salvar vacina.", error);
            throw error;
        }

    }

    useEffect(() => {
        setNomeVacina('')
        setDataAplicada('')
        setDataProxDose('')
        setObs('')
    }, [])

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Text style={styles.title}>{nome}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome da vacina"
                value={nomeVacina}
                onChangeText={setNomeVacina}
            />
            <TextInput
                style={styles.input}
                placeholder="Data aplicada"
                value={dataAplicada}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(text) => setDataAplicada(formatDate(text))}
            />
            <TextInput
                style={styles.input}
                placeholder="Próxima dose"
                value={dataProxDose}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(text) => setDataProxDose(formatDate(text))}
            />
            <TextInput
                style={styles.textArea}
                placeholder="Observações (opcional)"
                value={obs}
                onChangeText={setObs}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={saveVaccine}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NewVaccine;