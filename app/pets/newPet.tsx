import { TextInput } from "react-native";
import { View } from "react-native";
import { Stack } from 'expo-router';

function NewPet() {
    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />
            <TextInput 
            placeholder="Informe o nome do pet"
            >
            </TextInput>
        </View>
    )
}

export default NewPet; 