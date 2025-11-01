import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import styles from './pets.styles';
import { useRouter } from "expo-router"

export default function Pets() {
  const pets = [{ id: '1', nome: 'Max', raca: 'Golden Retriever' }];
  const router = useRouter()
  return (
    <View style={styles.container}>
      
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Meus Pets</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.petName}>{item.nome}</Text>
            <Text style={styles.petBreed}>{item.raca}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={()=>router.push('/pets/newPet')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
  