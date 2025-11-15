import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import styles from "./login.styles";
import { useRouter } from "expo-router";
import { signIn } from "@/services/firebase/authService";
import { Stack } from "expo-router"
// importa o serviço de autenticação
import { login } from "../../services/firebase/auth";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    if (!email || !senha) {
      Alert.alert("Os campos de Email e Senha são obrigatórios.")
      return;
    }

    try {
      const user = await signIn(email, senha);
      console.log("LOGADO:", user.uid);
      router.push("/pets");
    } catch (err: any) {
      console.log("ERRO LOGIN:", err.code);

      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        Alert.alert(
          "Usuário e senha estão incorretos",
          "Deseja criar uma conta?",
          [
            {
              text: "Criar Conta",
              onPress: () => router.push("/auth/register"),
            },
            {
              text: "Tentar Novamente",
              style: "cancel",

            },
          ]
        );

      }
      if (err.code === "auth/wrong-password") {
        alert("Senha incorreta. Tente novamente.");
        return;
      }

      console.log("Erro ao fazer login: " + err.message);
    }
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.registerLink}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;