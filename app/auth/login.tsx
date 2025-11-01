import { useState } from "react"
import { TextInput, TextInputBase, TouchableOpacity, View, Text } from "react-native"
import styles from './login.styles'
import { useRouter } from "expo-router"

function Login() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleLogin() {
        console.log('login com', email, senha)
        //router.push('/pets') // apos o login, ir para tela de pets
    }

return (
  <View style={styles.container}>
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={()=> router.push('./pets')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={() => console.log('ir para tela de cadastro')}>
      <Text style={styles.registerText}>
        Não tem uma conta? <Text style={styles.registerLink}>Criar conta</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

}

export default Login