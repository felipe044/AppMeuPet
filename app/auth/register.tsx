import { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Alert, KeyboardAvoidingView, Platform} from "react-native";
import { router } from "expo-router";
import { signUp } from "../../services/firebase/authService";
import styles from "../auth/register.styles";
import {Stack} from "expo-router"

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        if (!email || !senha || !confirmarSenha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não conferem.");
            return;
        }

        try {
            setLoading(true);

            const user = await signUp(email, senha);
            console.log("Usuário criado:", user.uid);

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            router.push("/auth/login");

        } catch (err: any) {
            console.log("ERRO CADASTRO:", err);

            if (err.code === "auth/email-already-in-use") {
                Alert.alert("Erro", "Este e-mail já está em uso.");
                return;
            }

            Alert.alert("Erro ao criar conta", err.message);
        } finally {
            setLoading(false);
        }
    }

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Stack.Screen options={{ headerShown: false }} />

            <Text style={styles.title}>Criar Conta</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="seuemail@exemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="******"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="******"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Criando..." : "Criar Conta"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={styles.link}>
                    Já tem uma conta? Fazer login
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
